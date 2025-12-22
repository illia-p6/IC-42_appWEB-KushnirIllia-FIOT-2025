# HomeDecor — Практична робота 5
**Тема:** Розгортання та інтеграція бекенд-сервера (REST API)

## Що зроблено
- Піднято **Node.js + Express** сервер.
- Реалізовано **REST API** для сутності `Products`:
  - `GET /api/products`
  - `GET /api/products/:id`
  - `POST /api/products`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`
- Додано `cors()` (щоб фронтенд міг робити запити).
- Додано просту інтеграцію з фронтендом: сервер віддає статичну сторінку `public/index.html`, яка викликає API через `fetch`.

> На цьому етапі дані зберігаються у памʼяті (масив `products`). Пізніше можна підключити MSSQL та працювати з таблицею `Products`.

## Запуск
1. Відкрий термінал у папці проєкту.
2. Встанови залежності:
   ```bash
   npm install
   ```
3. Запусти сервер:
   ```bash
   npm start
   ```
4. Перевір:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3000/api/products`

## Приклади запитів (для звіту)
### GET
- `GET http://localhost:3000/api/products`

### POST
```http
POST http://localhost:3000/api/products
Content-Type: application/json

{"name":"Ваза","price":530}
```

### PUT
```http
PUT http://localhost:3000/api/products/1
Content-Type: application/json

{"price":499}
```

### DELETE
- `DELETE http://localhost:3000/api/products/1`

## Структура
```
HomeDecor_Practice5/
├─ index.js
├─ routes/
│  └─ products.js
├─ public/
│  ├─ index.html
│  └─ js/
│     └─ app.js
└─ package.json
```
