# 🏗️ Кодстайл проекта

## Защита веток и требования к PR

### Настройка двух апрувов

Проект настроен на требование **минимум 2 апрува** для всех Pull Request в ветки `main` и `dev`.

#### Workflow файлы:

1. **`.github/workflows/branch-protection.yml`** - автоматически настраивает защиту веток
2. **`.github/workflows/require-approvals.yml`** - проверяет количество апрувов в PR

#### Что настроено:

- ✅ Требуется минимум 2 апрува от разных пользователей
- ✅ Обязательные проверки CI (Lint, Test)
- ✅ Запрет force push в защищенные ветки
- ✅ Требуется разрешение конфликтов в разговорах
- ✅ Автоматическое отклонение устаревших апрувов при новых коммитах

#### Шаблоны:

- **Pull Request Template** - автоматически добавляется при создании PR
- **Issue Templates** - шаблоны для багов и запросов функций

### Как запустить настройку:

1. Перейдите в **Actions** → **Branch Protection Setup**
2. Нажмите **Run workflow**
3. Выберите ветку `main` и запустите

### Проверка настроек:

```bash
# Проверить текущие настройки защиты веток
gh api repos/:owner/:repo/branches/main/protection

# Проверить настройки для ветки dev
gh api repos/:owner/:repo/branches/dev/protection
```

### Ручная настройка (если workflow не работает):

1. Перейдите в **Settings** → **Branches**
2. Добавьте правило для веток `main` и `dev`
3. Включите:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (2)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging

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