
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
  useCallback
} from 'react';

// Контекст для поточної теми
const ThemeStateContext = createContext(null);

// Контекст для функцій зміни теми
const ThemeActionsContext = createContext(null);

function getInitialMode() {
  try {
    const saved = localStorage.getItem('theme');

    if (['light', 'dark', 'system', 'blue'].includes(saved)) {
      return saved;
    }
  } catch {
    // Використовуємо стандартну тему
  }

  return 'light';
}

function getSystemTheme() {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function themeReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return action.payload;

    case 'TOGGLE':
      return state === 'dark' ? 'light' : 'dark';

    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [mode, dispatch] = useReducer(
    themeReducer,
    undefined,
    getInitialMode
  );

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const theme = mode === 'system' ? systemTheme : mode;

  // Стежимо за системною темою
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const media = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const updateSystemTheme = () => {
      setSystemTheme(media.matches ? 'dark' : 'light');
    };

    updateSystemTheme();

    media.addEventListener('change', updateSystemTheme);

    return () => {
      media.removeEventListener('change', updateSystemTheme);
    };
  }, []);

  // Синхронізація теми між вкладками браузера
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== 'theme') return;

      const newMode = event.newValue;

      if (['light', 'dark', 'system', 'blue'].includes(newMode)) {
        dispatch({
          type: 'SET_THEME',
          payload: newMode
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Зберігаємо тему
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem('theme', mode);
    } catch {
      console.warn('Не вдалося зберегти тему');
    }
  }, [theme, mode]);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  const setTheme = useCallback((newMode) => {
    dispatch({
      type: 'SET_THEME',
      payload: newMode
    });
  }, []);

  // Окремо мемоізуємо стан
  const stateValue = useMemo(() => ({
    theme,
    mode
  }), [theme, mode]);

  // Окремо мемоізуємо функції
  const actionsValue = useMemo(() => ({
    toggleTheme,
    setTheme
  }), [toggleTheme, setTheme]);

  return (
    <ThemeActionsContext.Provider value={actionsValue}>
      <ThemeStateContext.Provider value={stateValue}>
        {children}
      </ThemeStateContext.Provider>
    </ThemeActionsContext.Provider>
  );
}

// Хук для отримання стану
export function useThemeState() {
  const context = useContext(ThemeStateContext);

  if (!context) {
    throw new Error(
      'useThemeState потрібно використовувати всередині ThemeProvider'
    );
  }

  return context;
}

// Хук для отримання функцій
export function useThemeActions() {
  const context = useContext(ThemeActionsContext);

  if (!context) {
    throw new Error(
      'useThemeActions потрібно використовувати всередині ThemeProvider'
    );
  }

  return context;
}

// Спільний хук для зручності
export function useTheme() {
  const state = useThemeState();
  const actions = useThemeActions();

  return { ...state, ...actions };
}
