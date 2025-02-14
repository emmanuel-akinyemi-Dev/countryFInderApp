// File: src/styles/themes.ts
import { StyleSheet } from "react-native";

export const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  button: "#007BFF",
};

export const darkTheme = {
  background: "#121212",
  text: "#FFFFFF",
  button: "#1E90FF",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 18,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
