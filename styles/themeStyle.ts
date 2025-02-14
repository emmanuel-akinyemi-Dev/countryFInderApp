import { StyleSheet } from "react-native";

export const themeStyles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  darkContainer: { backgroundColor: "#121212" },
  lightContainer: { backgroundColor: "#f8f8f8" },
  card: { padding: 10, marginVertical: 5, borderRadius: 8, elevation: 3 },
  darkCard: { backgroundColor: "#333" },
  lightCard: { backgroundColor: "#fff" },
  textDark: { color: "#fff" },
  textLight: { color: "#000" },
  flag: { width: 50, height: 30, marginRight: 10, borderRadius: 4 },
  themeButton: {
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  darkButton: { backgroundColor: "#444" },
  lightButton: { backgroundColor: "#ddd" },
  themeButtonText: { fontSize: 16, fontWeight: "bold" },
});
