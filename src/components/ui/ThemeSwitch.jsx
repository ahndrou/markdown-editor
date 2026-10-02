import { useEffect } from "react";
import usePersistedState from "../../hooks/usePersistedState";
import { DarkModeIcon, LightModeIcon } from "../SVGComponents";
import { Switch } from "./switch";

export default function ThemeSwitch({ className }) {
  const [theme, setTheme] = usePersistedState("theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function switchTheme() {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <label className="cursor-pointer" htmlFor="themeSwitch">
        <DarkModeIcon className={theme === "dark" ? "fill-100" : ""} />
      </label>

      <Switch
        id="themeSwitch"
        className="cursor-pointer"
        onClick={switchTheme}
        checked={theme === "light"}
      />

      <label className="cursor-pointer" htmlFor="themeSwitch">
        <LightModeIcon className={theme === "light" ? "fill-100" : ""} />
      </label>
    </div>
  );
}
