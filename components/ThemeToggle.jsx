import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

// Both icons are always in the markup and CSS shows the right one, so the
// server render and the first client render are identical.
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label =
    theme === "dark" ? "Switch to light mode" : theme === "light" ? "Switch to dark mode" : "Toggle colour theme";

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <span className="icon icon-sun" aria-hidden="true">
        <Sun size={20} />
      </span>
      <span className="icon icon-moon" aria-hidden="true">
        <Moon size={20} />
      </span>

      <style jsx>{`
        .theme-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          color: var(--color-text-secondary);
          cursor: pointer;
          outline: none;
          transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }

        .theme-toggle:hover {
          color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.1);
        }

        .theme-toggle:focus-visible {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.1);
          box-shadow: 0 0 0 2px var(--color-accent);
        }

        .icon {
          display: none;
          line-height: 0;
        }

        :global([data-theme="dark"]) .icon-sun {
          display: inline-flex;
        }

        :global(:root:not([data-theme="dark"])) .icon-moon {
          display: inline-flex;
        }
      `}</style>
    </button>
  );
}
