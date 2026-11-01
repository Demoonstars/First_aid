# Итоговый тест: Действия при угрозе БПЛА

SPA для прохождения итогового теста. Результаты сохраняются в Google Таблицу через Google Apps Script.

## Быстрый старт
1. Скопируйте файлы в папку проекта.
2. Настройте Google Apps Script (см. ниже).
3. Вставьте URL в `app.js` в переменную `GOOGLE_SCRIPT_URL`.
4. Откройте `index.html` в браузере (рекомендуется через локальный сервер).

---

## Настройка Google Apps Script (Инструкция)

### Шаг 1. Создайте НОВУЮ Google Таблицу
Перейдите на [sheets.google.com](https://sheets.google.com) и создайте новую таблицу. 
*(Добавьте заголовки в первую строку: Дата, ФИО, Организация, Должность, Подразделение, Дата рождения, Дата трудоустройства, Правильных, Результат, Статус).*

### Шаг 2. Откройте Apps Script
В меню таблицы: **Расширения → Apps Script**. Удалите весь существующий код.

### Шаг 3. Вставьте код (Code.gs)
```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.fullName,
      data.organization,
      data.position,
      data.department,
      data.birthDate,
      data.hireDate,
      data.correctAnswers,
      data.percent + '%',
      data.passed ? 'Сдал' : 'Не сдал'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}