#!/usr/bin/env node
/**
 * Проверяет целостность банка вопросов без запуска браузера.
 * Запуск: node tools/validate-bank.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "js", "data");
const allowedLevels = new Set(["middle", "senior", "expert"]);
const context = { window: {} };
vm.createContext(context);

const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".js")).sort();
for (const file of files) {
  vm.runInContext(
    fs.readFileSync(path.join(dataDir, file), "utf8"),
    context,
    { filename: file }
  );
}

const questions = context.window.JavaToryData || [];
const errors = [];
const ids = new Set();
const categoryCounts = {};

for (const [index, question] of questions.entries()) {
  const label = question?.id || `#${index + 1}`;
  if (!question || typeof question !== "object") {
    errors.push(`${label}: элемент не является объектом`);
    continue;
  }
  if (typeof question.id !== "string" || !question.id.trim()) errors.push(`${label}: пустой id`);
  if (ids.has(question.id)) errors.push(`${label}: повторяющийся id`);
  ids.add(question.id);
  if (!question.category) errors.push(`${label}: не указана category`);
  if (!allowedLevels.has(question.level)) errors.push(`${label}: неверный level "${question.level}"`);
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

if (questions.length < 300 || questions.length > 400) {
  errors.push(`Всего вопросов: ${questions.length}, ожидается 300–400`);
}
if (files.length === 0) errors.push("В js/data нет файлов");

console.log(`Файлов: ${files.length}`);
console.log(`Вопросов: ${questions.length}`);
console.log("По категориям:", categoryCounts);

if (errors.length > 0) {
  console.error("\nНайдены ошибки:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("\nБанк вопросов валиден.");
}
