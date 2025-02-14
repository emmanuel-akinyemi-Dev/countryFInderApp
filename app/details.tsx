import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "../redux/store";
import { themeStyles } from "@/styles/themeStyle";

const DetailScreen = () => {
  const params = useLocalSearchParams();
  const darkMode = useSelector((state:RootState) => state.theme.darkMode);
  return (
    <View style={[styles.container, darkMode ? themeStyles.darkContainer : themeStyles.lightContainer]} >
      <Text style={[styles.name, {color: darkMode ? "#ffff" : "#000",marginRight:10}]}>{params.name}</Text>
      <Image
        source={{ uri: JSON.parse(params.flag as string) }}
        style={styles.flag}
      />
      <Text style={{ marginLeft: 13 , color: darkMode ? "#ffff" : "#000",}}>
        <Text style={[styles.text, { fontWeight: "bold", color: darkMode ? "#ffff" : "#000",marginRight:10 }]}>Capital City:</Text> 
        {params.capital}
      </Text>
      <Text style={{ marginLeft: 13, color: darkMode ? "#ffff" : "#000", }}>
        <Text style={[styles.text, { fontWeight: "bold", color: darkMode ? "#ffff" : "#000",marginRight:10 }]}>Population:</Text> 
        {params.population}
      </Text>
      <Text style={{ marginLeft: 13,  color: darkMode ? "#ffff" : "#000", }}> 
         <Text style={[styles.text, { fontWeight: "bold",  color: darkMode ? "#ffff" : "#000",marginRight:10 }]}>Continent:</Text> {params.continent}
      </Text>
      <Text style={{ marginLeft: 13, color: darkMode ? "#ffff" : "#000", }}>
        <Text style={[styles.text, { fontWeight: "bold", color: darkMode ? "#ffff" : "#000", marginRight:10}]}>Country Code:</Text> 
        {params.code}
      </Text>
      <Text style={{ marginLeft: 13 , color: darkMode ? "#ffff" : "#000",marginRight:10}}>
        <Text style={[styles.text, { fontWeight: "bold", color: darkMode ? "#ffff" : "#000",marginRight:10 }]}>Current President:</Text> 
        {params.leader}
      </Text>
      <Text style={{ marginLeft: 13 , color: darkMode ? "#ffff" : "#000",}}>
        <Text style={[styles.text, { fontWeight: "bold", color: darkMode ? "#ffff" : "#000",marginRight:10 }]}>timezone:</Text> 
        {params.timezone}
      </Text>
      <Text style={{ marginLeft: 13 , color: darkMode ? "#ffff" : "#000",}}>
        <Text style={[styles.text, { fontWeight: "bold", color: darkMode ? "#ffff" : "#000",marginRight:10 }]}>Official Language:</Text> 
        {params.languages}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",

  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  flag: {
    alignSelf: "center",
    width: "95%",
    height: "35%",
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    
  },
});

export default DetailScreen;
