import React from "react";
import { TouchableOpacity, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { themeStyles } from "../styles/themeStyle";
import { RootState } from "../redux/store";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

const ThemeToggle = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => dispatch(toggleTheme())} 
    >
      {darkMode  ? (
            <Entypo
              name="moon"
              size={24}
              color={darkMode ? "#ffff" : "#000"}
            />
          ) : (
            <Feather name="sun" size={24} color="black" />
          )}
    </Pressable>
  );
};

export default ThemeToggle;
