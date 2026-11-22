#!/usr/bin/env node
/**
 * Проверяет целостность основного банка и трека по легенде.
 * Запуск: node tools/validate-bank.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowedLevels = new Set(["middle", "senior", "expert"]);
const datasets = [
  {
    name: "Основной банк",
    directory: path.join(root, "js", "data"),
    property: "JavaToryData",
    min: 300,
    max: 400
  },
  {
    name: "Трек «Легенда»",
    directory: path.join(root, "js", "data", "legend"),
    property: "JavaToryLegendData",
    min: 250,
    max: null
  }
];

const context = { window: {} };
vm.createContext(context);
const errors = [];
const allIds = new Set();

function loadFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => entry.name)
    .sort();
}

for (const dataset of datasets) {
  const files = loadFiles(dataset.directory);
  if (files.length === 0) errors.push(`${dataset.name}: нет JS-файлов в ${dataset.directory}`);

  for (const file of files) {
    try {
      vm.runInContext(
        fs.readFileSync(path.join(dataset.directory, file), "utf8"),
        context,
        { filename: `${dataset.property}/${file}` }
      );
    } catch (error) {
      errors.push(`${dataset.name}/${file}: синтаксическая ошибка: ${error.message}`);
    }
  }

  const questions = context.window[dataset.property] || [];
  const categoryCounts = {};
  const levelCounts = { middle: 0, senior: 0, expert: 0 };

  for (const [index, question] of questions.entries()) {
    const label = question?.id || `${dataset.name} #${index + 1}`;
    if (!question || typeof question !== "object") {
      errors.push(`${label}: элемент не является объектом`);
      continue;
    }
    if (typeof question.id !== "string" || !question.id.trim()) errors.push(`${label}: пустой id`);
    if (allIds.has(question.id)) errors.push(`${label}: повторяющийся id`);
    allIds.add(question.id);
    if (!question.category) errors.push(`${label}: не указана category`);
    if (!allowedLevels.has(question.level)) {
      errors.push(`${label}: неверный level "${question.level}"`);
    } else {
      levelCounts[question.level] += 1;
    }
    if (typeof question.q !== "string" || !question.q.trim()) errors.push(`${label}: пустой текст вопроса`);
    if (typeof question.explain !== "string" || !question.explain.trim()) errors.push(`${label}: пустое объяснение`);
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${label}: должно быть ровно 4 варианта ответа`);
    } else {
      if (new Set(question.options).size !== 4) errors.push(`${label}: варианты ответов повторяются`);
      if (question.options.some((option) => typeof option !== "string" || !option.trim())) {
        errors.push(`${label}: найден пустой вариант ответа`);
      }
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) {
      errors.push(`${label}: answer должен быть индексом от 0 до 3`);
    }
    categoryCounts[question.category] = (categoryCounts[question.category] || 0) + 1;
  }

  if (questions.length < dataset.min || (dataset.max !== null && questions.length > dataset.max)) {
    const range = dataset.max === null
      ? `не меньше ${dataset.min}`
      : `${dataset.min}–${dataset.max}`;
    errors.push(`${dataset.name}: ${questions.length} вопросов, ожидается ${range}`);
  }

  console.log(`\n${dataset.name}`);
  console.log(`  Файлов: ${files.length}`);
  console.log(`  Вопросов: ${questions.length}`);
  console.log(`  По уровням: ${JSON.stringify(levelCounts)}`);
  console.log("  По категориям:", categoryCounts);
}

console.log(`\nВсего уникальных вопросов: ${allIds.size}`);

if (errors.length > 0) {
  console.error("\nНайдены ошибки:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("\nОба банка валидны.");
}
