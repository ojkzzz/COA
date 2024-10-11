#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

// Определяем путь к шаблону и к целевой директории
const templateDir = path.resolve(__dirname, "../ojk-template-app");
const targetDir = process.argv[2] || ".";

// Копируем файлы из шаблона в целевую директорию
fs.copy(templateDir, targetDir)
  .then(() => console.log("Template copied successfully!"))
  .catch((err) => console.error("Error copying template:", err));
