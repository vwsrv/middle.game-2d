# Middle Game 2D
---
## Ссылка на обзор по проделанной работе в 5 - 6 спринтах: https://drive.google.com/file/d/1iZnuMBhSgFAG401tFStqKbTNVO9rHMm4/view?usp=sharing
## Ссылка на обзор по проделанной работе в 7 - 8 спринтах: https://disk.yandex.ru/d/1v-XcHOl30EGNQ


## Preview: https://clck.ru/3NcJKR
---
### Установка и запуск

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd middle.game-2d
   ```

2. **Установите зависимости** (обязательный шаг!)
   ```bash
   yarn bootstrap
   ```

3. **Запустите проект**
   ```bash
   yarn dev
   ```

### Дополнительные команды

```bash
# Запуск только клиента
yarn dev --scope=client

# Запуск только сервера
yarn dev --scope=server

# Запуск тестов
yarn test

# Линтинг
yarn lint

# Форматирование кода
yarn format

# Сборка для production
yarn build

# Предварительный просмотр
yarn preview --scope=client
yarn preview --scope=server
```
---
## Алиасы (Path Mapping)

Проект поддерживает алиасы для удобства импорта модулей.

### Клиентская часть (packages/client)

Доступные алиасы:
- `@/*` - корневая директория src
- `@/shared/*` - общие компоненты и утилиты
- `@/entities/*` - бизнес-сущности
- `@/features/*` - функциональные модули
- `@/widgets/*` - виджеты
- `@/pages/*` - страницы
- `@/app/*` - конфигурация приложения

Примеры использования:
```typescript
// Вместо
import { Component } from '../../../shared/components/Component'

// Можно использовать
import { Component } from '@/shared/components/Component'

// Импорт сущности
import { User } from '@/entities/user'

// Импорт фичи
import { AuthFeature } from '@/features/auth'
```

### Серверная часть (packages/server)

Доступные алиасы:
- `@/*` - корневая директория сервера
- `@/db` - модуль базы данных
- `@/index` - главный файл сервера

Примеры использования:
```typescript
// Вместо
import { db } from '../db'

// Можно использовать
import { db } from '@/db'
```

### Настройка

Алиасы настроены в:
- `packages/client/tsconfig.json` - для TypeScript
- `packages/client/vite.config.ts` - для Vite
- `packages/server/tsconfig.json` - для серверной части

Современное веб-приложение для 2D игр, построенное с использованием архитектуры **Feature-Sliced Design (FSD)** и современных технологий разработки.

## 📋 Описание проекта

Этот проект представляет собой полноценное веб-приложение с клиент-серверной архитектурой, предназначенное для разработки 2D игр. Проект использует монорепозиторий на основе Lerna и следует принципам FSD для обеспечения масштабируемости и поддерживаемости кода.

## 🏗️ Архитектура

### Feature-Sliced Design (FSD)

Проект построен на архитектуре **Feature-Sliced Design** - современном подходе к организации фронтенд-кода, который обеспечивает:

- **Бизнес-ориентированность** - код организован вокруг пользовательских историй
- **Слабая связанность** - модули независимы друг от друга
- **Высокое сцепление** - связанный код находится рядом
- **Масштабируемость** - легко добавлять новые функции
- **Стандартизацию** - четкие правила организации кода

📚 **Подробнее о FSD:** [Статья на Habr](https://habr.com/ru/companies/piter/articles/744824/)

### Структура проекта

```
packages/
├── client/          # React приложение (фронтенд)
└── server/          # Express сервер (бэкенд)
```

## 🛠️ Технологический стек

### Frontend
- ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black) **React 18** - библиотека для создания пользовательских интерфейсов
- ![TypeScript](https://img.shields.io/badge/TypeScript-4.8-3178C6?logo=typescript&logoColor=white) **TypeScript** - типизированный JavaScript
- ![Vite](https://img.shields.io/badge/Vite-3.0-646CFF?logo=vite&logoColor=white) **Vite** - быстрый сборщик и dev-сервер
- ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?logo=redux&logoColor=white) **Redux Toolkit** - управление состоянием приложения
- ![Ant Design](https://img.shields.io/badge/Ant_Design-5.26-1890FF?logo=ant-design&logoColor=white) **Ant Design** - UI компоненты
- ![Jest](https://img.shields.io/badge/Jest-28-C21325?logo=jest&logoColor=white) **Jest + React Testing Library** - тестирование
- ![ESLint](https://img.shields.io/badge/ESLint-8.23-4B32C3?logo=eslint&logoColor=white) **ESLint + Prettier** - линтинг и форматирование

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-15-339933?logo=node.js&logoColor=white) **Node.js** - серверная среда выполнения
- ![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white) **Express** - веб-фреймворк
- ![TypeScript](https://img.shields.io/badge/TypeScript-4.8-3178C6?logo=typescript&logoColor=white) **TypeScript** - типизированный JavaScript
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.8-336791?logo=postgresql&logoColor=white) **PostgreSQL** - реляционная база данных
- ![Jest](https://img.shields.io/badge/Jest-28-C21325?logo=jest&logoColor=white) **Jest** - тестирование
- ![Nodemon](https://img.shields.io/badge/Nodemon-2.0-76D04B?logo=nodemon&logoColor=white) **Nodemon** - автоматическая перезагрузка при разработке

### Инфраструктура
- ![Lerna](https://img.shields.io/badge/Lerna-5.4-9333EA?logo=lerna&logoColor=white) **Lerna** - управление монорепозиторием
- ![Docker](https://img.shields.io/badge/Docker-20.10-2496ED?logo=docker&logoColor=white) **Docker** - контейнеризация
- ![Lefthook](https://img.shields.io/badge/Lefthook-1.3-000000?logo=git&logoColor=white) **Lefthook** - Git hooks
- ![Vercel](https://img.shields.io/badge/Vercel-Platform-000000?logo=vercel&logoColor=white) **Vercel** - автоматический деплой

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** >= 15
- **Docker** (для production)
- **Yarn** (рекомендуется)

## 📦 Управление зависимостями

Проект использует монорепозиторий на основе Lerna:

```bash
# Добавить зависимость для клиента
yarn lerna add {package} --scope client

# Добавить зависимость для сервера
yarn lerna add {package} --scope server

# Добавить зависимость для всех пакетов
yarn lerna add {package}

# Добавить dev-зависимость
yarn lerna add {package} --dev --scope server
```

## 🧪 Тестирование

### Frontend тесты
Используется React Testing Library для тестирования компонентов:
```bash
yarn test
```

### Backend тесты
Jest для тестирования серверной логики:
```bash
yarn test
```

## 🔧 Git Hooks

В проекте используется [Lefthook](https://github.com/evilmartians/lefthook) для автоматических проверок при коммитах.

> ⚠️ Если очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте!)

## 🚀 Деплой

### Автодеплой на Vercel

1. Зарегистрируйтесь на [Vercel](https://vercel.com/)
2. Следуйте [инструкции Vite](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
3. Укажите `root directory` как `packages/client`

Все PR будут автоматически деплоиться на Vercel с URL от деплой-бота.

### Production в Docker

Перед первым запуском выполните:
Это необходимо для создания файла конфигурации на вашем локальном компьютере.
```bash

node init.js
```

Запуск всех сервисов:
Для запуска нужно быть в папке `docker`
`cd docker`

```bash
  # Сборка и запуск
  docker-compose up --build

  # Запуск в фоновом режиме
  docker-compose up -d

  # Остановка
  docker-compose down

  # Остановка с удалением volumes
  docker-compose down -v
```

Сервисы:
- **nginx** - раздача клиентской статики
- **server** - Node.js сервер
- **postgres** - база данных

Запуск отдельного сервиса:
```bash
docker compose up server
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Запустите тесты и линтинг
5. Создайте Pull Request

## 🆘 Поддержка

Если что-то не работает, создайте issue - мы поможем! 😊

## 📄 Лицензия

MIT License

---

**Создано с ❤️ используя Feature-Sliced Design**
