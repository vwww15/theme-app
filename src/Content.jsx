
import { useTheme } from './ThemeContext.jsx';

export default function Content() {
  const { theme } = useTheme();

  return (
    <main className="content">
      <h2>Ласкаво просимо!</h2>

      <p>
        Це навчальний застосунок для демонстрації
        React Context API.
      </p>

      <p>
        Поточна тема: <strong>
          {theme === 'dark'
  ? 'Темна'
  : theme === 'blue'
    ? 'Синя'
    : 'Світла'}
        </strong>
      </p>
    </main>
  );
}
