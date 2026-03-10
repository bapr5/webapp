# PWA - Установка приложения на рабочий стол (A2HS)

Это приложение теперь поддерживает функцию добавления на рабочий стол (Add to Home Screen / A2HS).

## 📋 Что было добавлено

### 1. **manifest.json**
Главный файл конфигурации PWA-приложения с метаинформацией:
- Имя и описание приложения
- Иконки различных размеров
- Тема и цвет фона
- Ориентация экрана
- Start URL и область видимости

### 2. **Service Worker (service-worker.js)**
Скрипт для работы приложения в оффлайне:
- **Кеширование ресурсов** при установке
- **Network First стратегия** для API запросов (сначала сеть, потом кеш)
- **Cache First стратегия** для статических файлов (сначала кеш, потом сеть)
- **Оффлайн страница** при отсутствии соединения

### 3. **React Hook (useInstallPrompt)**
Кастомный хук для управления установкой приложения:

```javascript
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

const MyComponent = () => {
  const { canInstall, installApp } = useInstallPrompt();

  return (
    <button 
      onClick={installApp}
      disabled={!canInstall}
    >
      Установить приложение
    </button>
  );
};
```

### 4. **InstallButton компонент**
Готовый компонент для отображения кнопки установки:

```javascript
import InstallButton from './components/InstallButton/InstallButton';

// В вашем компоненте (например Header)
<InstallButton />
```

## 🚀 Как использовать

### Вариант 1: Добавить кнопку в Header

Обновите [src/components/Header/Header.jsx](src/components/Header/Header.jsx):

```javascript
import InstallButton from '../InstallButton/InstallButton';

const Header = () => {
  return (
    <header>
      <h1>React PWA</h1>
      <InstallButton />
    </header>
  );
};
```

### Вариант 2: Собственная реализация кнопки

```javascript
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

const CustomInstallButton = () => {
  const { canInstall, installApp } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <button onClick={installApp} className="my-button">
      Добавить на рабочий стол
    </button>
  );
};
```

## 🎨 Иконки приложения

Создайте иконки и поместите их в папку `public/`:

```
public/
  ├── icon-96.png      (96x96px)
  ├── icon-192.png     (192x192px)
  ├── icon-512.png     (512x512px)
  ├── icon-192-maskable.png  (для адаптивных иконок)
  ├── icon-512-maskable.png  (для адаптивных иконок)
  ├── screenshot-540.png      (540x720px для узких экранов)
  └── screenshot-1280.png     (1280x720px для широких экранов)
```

**Важно:** Иконки должны быть в формате **PNG с прозрачностью**.

### Как создать иконки:

1. **Используйте сервис** (например, [maskable.app](https://maskable.app/))
2. **Инструменты:**
   - ImageMagick: `convert icon.png -resize 192x192 icon-192.png`
   - Figma
   - Photoshop
   - Adobe XD

## 🔧 Установка зависимостей

```bash
npm install
```

это установит `copy-webpack-plugin`, необходимый для копирования файлов PWA.

## 🏗️ Сборка и запуск

```bash
# Сборка
npm run build

# Запуск в development режиме (локальный сервер)
npm start
```

## ✅ Проверка работы

### На рабочем столе (Desktop):

1. Откройте приложение в Chrome/Edge
2. Нажмите на иконку установки в адресной строке
3. Нажмите "Установить"

### На мобильном устройстве:

1. Откройте в браузере (Chrome, Firefox, Safari на iOS)
2. Нажмите кнопку меню
3. Выберите "Добавить на рабочий стол" или "Install"
4. Альтернативно используйте кнопку `<InstallButton />`

### Проверка Service Worker:

1. Откройте DevTools (F12)
2. Перейдите на вкладку **Application** (Chrome) или **Storage** (Firefox)
3. В левом меню найдите **Service Workers**
4. Проверьте статус регистрации

## 🔍 Отладка

### Проблема: Service Worker не регистрируется

**Решение:**
- Проверьте консоль DevTools для ошибок
- Убедитесь, что приложение запущено по **HTTPS** (или локально на localhost)
- Очистите кеш: DevTools → Application → Clear storage

### Проблема: Иконки не отображаются

**Решение:**
- Добавьте иконки в `public/`
- Пересоберите приложение: `npm run build`
- Очистите кеш браузера

### Проблема: Кнопка установки не видна

**Решение:**
- Убедитесь, что используется HTTPS (или localhost)
- Проверьте, что manifest.json доступен
- Проверьте консоль для ошибок загрузки

## 📱 Типы установки

### Chrome/Edge Desktop:
- Иконка установки в адресной строке
- Контекстное меню → "Установить приложение"
- Пользовательская кнопка в приложении

### Firefox:
- Домашняя страница → кнопка "Установить"
- Пользовательская кнопка в приложении

### Safari (iOS/macOS):
- Поделиться → Добавить на рабочий стол
- Только через пользовательскую кнопку

## 📚 Дополнительные ресурсы

- [Web App Manifest Specification](https://www.w3.org/TR/appmanifest/)
- [Service Worker Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Maskable Icons](https://blogs.windows.com/msedgedev/2020/09/22/maskable-icon-android-adaptive-icons-pwa/)

## 🎯 Стратегия кеширования

### Network First (для API):
```
API запрос → Попытка сети → Если успех → Сохранить в кеш → Выдать результат
                         ↓ Если ошибка
                    Использовать кеш
```

### Cache First (для статики):
```
Запрос → Есть в кеше? → ДА → Выдать из кеша
                 ↓ НЕТ
           Загрузить из сети → Сохранить в кеш → Выдать
                 ↓ Ошибка сети
           Выдать offline.html
```

---

✨ Ваше приложение теперь полностью поддерживает PWA и может быть установлено пользователями как настоящее приложение!
