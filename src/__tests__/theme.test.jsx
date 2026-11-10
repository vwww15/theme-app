
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext.jsx';
import Header from '../Header.jsx';

describe('ThemeContext', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    document.documentElement.dataset.theme = 'light';
  });

  it('перемикає світлу тему на темну', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(document.documentElement.dataset.theme).toBe('light');

    fireEvent.click(
      screen.getByRole('button', { name: /Змінити тему/i })
    );

    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('зберігає вибрану тему в localStorage', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Змінити тему/i })
    );

    expect(localStorage.getItem('theme')).toBe('dark');

    cleanup();

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('викидає помилку без ThemeProvider', () => {
    function TestComponent() {
      useTheme();
      return null;
    }

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      expect(() => render(<TestComponent />)).toThrow(
        /ThemeProvider/
      );
    } finally {
      spy.mockRestore();
    }
  });
});
