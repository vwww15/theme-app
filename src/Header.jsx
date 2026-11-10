
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeContext.jsx';

export default function Header() {
  const { theme, mode, toggleTheme, setTheme } = useTheme();

  return (
    <header className="header">
      <h1>Мій React-застосунок</h1>

      <div style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? <FiMoon /> : <FiSun />}
          {' '}Змінити тему
        </button>

        <label>
          Режим:{' '}
          <select
            value={mode}
            onChange={(event) =>
              setTheme(event.target.value)
            }
          >
            <option value="light">☀️ Світла</option>
            <option value="dark">🌙 Темна</option>
            <option value="system">💻 Системна</option>
            <option value="blue">💙 Синя</option>
          </select>
        </label>
      </div>
    </header>
  );
}
