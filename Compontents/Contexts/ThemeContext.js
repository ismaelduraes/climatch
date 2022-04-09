import { createContext } from "react";
export const themes = {
  dark: {
    name: "dark",
    accent: "black",
    text: "white",
    widget: "#171717",
    background: "black",
    statusBar: "light",
    fontRegular: "Atkinson-Hyperlegible",
    fontBold: "Atkinson-Hyperlegible-Bold",
  },
  light: {
    name: "light",
    accent: "black",
    text: "black",
    widget: "white",
    background: "#e8e8e8",
    statusBar: "dark",
    fontRegular: "Atkinson-Hyperlegible",
    fontBold: "Atkinson-Hyperlegible-Bold",
  },
};
export const ThemeContext = createContext();
