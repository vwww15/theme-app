
# Перемикач теми — React Context API

Лабораторна робота з React Context API.

## Мета роботи

Створення React-застосунку для перемикання тем оформлення
з використанням Context API, localStorage та Zustand.

## Використані технології

- React
- Vite
- React Context API
- React Hooks
- CSS Variables
- React Icons
- Zustand
- Vitest
- React Testing Library

## Реалізовані рівні

### Рівень 1
- Створено ThemeContext і ThemeProvider.
- Реалізовано перемикання світлої та темної тем.
- Створено компоненти Header, Content та Footer.

### Рівень 2
- Збереження теми в localStorage.
- Кастомний хук useTheme().
- Використання CSS-змінних і data-theme.
- Іконки сонця та місяця.

### Рівень 3
- Режими light, dark, system, blue.
- Керування станом через useReducer.
- Оптимізація через useMemo та useCallback.
- Розділення контексту стану та дій.
- Автоматичне визначення системної теми.

### Рівень 4
- Три автоматизовані тести.
- Синхронізація теми між вкладками.
- Усунення миготіння теми під час завантаження.
- Окрема реалізація перемикача через Zustand.
- Порівняння Context API та Zustand.

## Порівняння Context API та Zustand

| Критерій | Context API | Zustand |
|---|---|---|
| Налаштування | Provider і контексти | Створення store |
| Передача даних | useContext | Хук із селектором |
| Зберігання | localStorage вручну | persist middleware |
| Компоненти | Усередині Provider | Provider не потрібен |
| Оптимізація | Розділення контекстів, useMemo | Підписка на вибрані значення |

Context API підходить для невеликих застосунків із
простим глобальним станом. Zustand забезпечує
компактнішу організацію сховища та вибіркові підписки.

## Запуск проєкту

npm install

npm run dev

## Тестування

npm test

Результат: 3 тести успішно пройдено.

## Production-збірка

npm run build

## Висновок

У ході роботи реалізовано застосунок із підтримкою
кількох тем оформлення. Досліджено можливості
React Context API, React Hooks і Zustand.
Перевірено коректність роботи автоматизованими тестами.
