
import { useEffect, useState } from 'react';
import { useZustandTheme } from './zustandTheme.js';

function ZustandHeader() {
  const mode = useZustandTheme((state) => state.mode);
  const setMode = useZustandTheme((state) => state.setMode);

  return (
    <header className="z-header">
      <h2>Перемикач теми — Zustand</h2>

      <label>
        Оберіть тему:{' '}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="light">☀️ Світла</option>
          <option value="dark">🌙 Темна</option>
          <option value="system">💻 Системна</option>
          <option value="blue">💙 Синя</option>
        </select>
      </label>
    </header>
  );
}

function ZustandContent() {
  const mode = useZustandTheme((state) => state.mode);

  return (
    <main className="z-content">
      <h3>Ласкаво просимо!</h3>
      <p>
        Цей компонент використовує Zustand
        замість React Context API.
      </p>
      <p>Обраний режим: <strong>{mode}</strong></p>
    </main>
  );
}

function ZustandFooter() {
  return (
    <footer className="z-footer">
      Лабораторна робота — Zustand
    </footer>
  );
}

export default function ZustandDemo() {
  const mode = useZustandTheme((state) => state.mode);

  const [systemDark, setSystemDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const update = (event) => setSystemDark(event.matches);

    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  const activeTheme =
    mode === 'system'
      ? systemDark ? 'dark' : 'light'
      : mode;

  return (
    <section
      className="zustand-demo"
      data-z-theme={activeTheme}
    >
      <ZustandHeader />
      <ZustandContent />
      <ZustandFooter />
    </section>
  );
}
