import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className="theme-btn" onClick={toggleTheme}>
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}