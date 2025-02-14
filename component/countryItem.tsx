import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "../redux/store";

interface CountryProps {
  country: {
    name: { common: string };
    flags: { png: string; svg: string };
    capital?: string[];
    population?: number;
    cca2: string;
    continents?: string;
    subregions?: string[];
    government?: { leader?: string };
    timezones?: string[];
    languages?: string[];
    religion?: string[];
    currency?:string[];
    translations?:string[];
    landLocked:Boolean
    maps:{ png: string; svg: string }
  };
}

const CountryItem: React.FC<CountryProps> = ({ country }:any) => {
  const router = useRouter();
  const darkMode = useSelector((state:RootState) => state.theme.darkMode); 
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/details",
          params: {
            name: country.name.common,
            flag: JSON.stringify(country.flags.png),  
            capital: country.capital ? country.capital[0] : "N/A",
            population: country.population,
            code: country.cca2,
            continent: country.continents ? country.continents[0] : "N/A",
            leader: country.government?.leader || "N/A",  
            timezone: country.timezones ? country.timezones[0] : "N/A",

          },
        })
      }
    >
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <Text style={[styles.name,{color:darkMode ? "#ffff" :"#000"} ]}>{country.name.common}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10, 
  },
  flag: {
    width: 40,
    height: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
});

export default CountryItem;
