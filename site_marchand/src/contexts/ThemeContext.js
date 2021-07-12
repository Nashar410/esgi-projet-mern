import { createContext, useState } from "react";

export const ThemeContext = createContext("light");

//ThemeContext.Provider;
//   Permet de diffuser la data du context dans tous les composants enfants de celui-ci

//ThemeContext.Consumer;
//    Permet de récupérer la data du context associé et définit dans le provider le plus proche

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "ligth" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
