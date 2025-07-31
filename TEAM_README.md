# 🏗️ Кодстайл проекта

## 🧩 Архитектура
- **Feature-Sliced Design (FSD)** — основная архитектура

## 📝 Нейминг файлов
- `kebab-case` для всех файлов:  
  `delivery-status.store.spec.ts`
- **ESLint правило**:  
  `unicorn/filename-case` с `kebabCase: true`

## 🗂️ Структура слайсов
Читать: https://habr.com/ru/companies/piter/articles/744824/

## 🏷 Нейминг переменных/функций
- `camelCase` по умолчанию:  
  `useSomeStore`
- `PascalCase` для типов/интерфейсов:  
  `TSomeType`
- `SCREAMING_SNAKE_CASE` для констант в `/constants`

## 🔖 Префиксы
- `use` — хуки: `useDeliveryStatusesStore`
- `T` — типы: `TSomeType`
- `E` — енамы: `ESomeEnum`
- `handle` — обработчики событий

## 📦 Public API
- Каждый модуль имеет `index.ts` с экспортами
- Используется `export *` для реэкспорта

## 🧪 Тестирование
- **Jest** + `.spec.ts` файлы рядом с тестируемым кодом
- Моки через `jest.mock()`

## 🔗 Импорты
- Абсолютные пути через алиасы:  
  `@/shared/*`, `@/entities/*`
- Относительные импорты внутри слайса  