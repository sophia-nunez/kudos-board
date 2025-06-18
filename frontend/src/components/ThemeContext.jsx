import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // check the device preferred to set the initial value
  const getPreferredTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getPreferredTheme);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  // return context provider
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// custom hook
export const useTheme = () => useContext(ThemeContext);
