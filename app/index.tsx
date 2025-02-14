import {
  Pressable,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
  Button,
  Touchable,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Dialog from "react-native-dialog";
import Feather from "@expo/vector-icons/Feather";

import { useState, useEffect } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../api/api";
import { RootState } from "../redux/store";
import { themeStyles } from "../styles/themeStyle";
import CountryItem from "../component/countryItem";
import ThemeToggle from "../component/themeToggle";
import { setLanguage } from "../redux/languageSlice"; // Redux action for language
import { useTranslation } from "react-i18next"; //
import { useLocalSearchParams } from "expo-router";

const API_URL = "https://restcountries.com/v3.1/all";

export interface Country {
  name: { common: string };
  flags: { png: string; svg: string };
  capital?: string[];
  population?: number;
  cca2: string;
  continents?: string;
  subregions?: string[];
  timezones?: string[];
  government?: { leader?: string };
  languages?: string[];
  religion?: string[];
  currency?: string[];
  translations?: string[];
  landLocked: Boolean;
  maps: { png: string; svg: string };
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [timezoneDialogVisible, setTimezoneDialogVisible] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [timezones, setTimezones] = useState<string[]>([]);
  const [continents, setContinents] = useState<string[]>([]);
  const [continentsVisible, setContinentsVisible] = useState(false);
  const [showContinent, setShowContinent] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [chosenLanguage, setChosenLanguage] = useState<any[]>([]);
  const [showLanguage, setShowLanguage] = useState(false);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const selectedLanguage = useSelector((state: any) => state.language.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(API_URL);
        setCountries(response.data);
        setFilteredCountries(response.data);
        const uniqueTimezones = Array.from(
          new Set(response.data.flatMap((c) => c.timezones || []))
        );
        setTimezones(uniqueTimezones);
        const uniqueContinents = Array.from(
          new Set(response.data.flatMap((c) => c.continents || []))
        );
        setContinents(uniqueContinents);
        const uniqueLanguage = Array.from(
          new Set(response.data.flatMap((c) => c.languages || []))
        );
        const seen = new Set();
        const unique = uniqueContinents.filter((item)=>{
          const key =JSON.stringify(item)
          if(seen.has(key)){
            return false
          }else{
            seen.add(key)
            return true
          }
        })
        setChosenLanguage(uniqueLanguage);
        console.log(chosenLanguage);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const handleContinentSelect = async (continent: string) => {
    setSelectedContinent(continent.toLocaleLowerCase());
    setLoading(true); // Show loading state
    setFilterDialogVisible(false);
    setTimezoneDialogVisible(false);
    setShowContinent(false);
    try {
      // Fetch country data based on the selected continent
      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${continent}`
      );

      // Extract the countries data from the response
      const regions = response.data;

      // Set the countries to the state
      setFilteredCountries(regions);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleLanguageSelect = async (language: any) => {
    setLoading(true); // Show loading state
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/lang/${language}`
      );
      const countries = response.data;
      setFilteredCountries(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredCountries(countries); // Reset to show all countries
    } else {
      const filtered = countries.filter((c) =>
        c.name.common.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleTimeZoneSelect = (timezone: string) => {
    setSelectedTimeZone(timezone);
    setFilteredCountries(
      countries.filter((c) => c.timezones?.includes(timezone))
    );
    setFilterDialogVisible(false);
    setTimezoneDialogVisible(false);
    setShowContinent(false);
  };

  return (
    <View
      style={[
        styles.container,
        darkMode ? themeStyles.darkContainer : themeStyles.lightContainer,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "pacifico",
            fontSize: 20,
            color: darkMode ? "#ffff" : "#000",
          }}
        >
          Explore<Text style={{ color: "orange", fontSize: 20 }}>.</Text>
        </Text>
        <ThemeToggle />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          justifyContent: "flex-start",
          padding: 10,
          alignItems: "center",
          width: "100%",
          backgroundColor: darkMode ? "#30302e" : "#F2F4F9",
          marginVertical: 10,
        }}
      >
        <Pressable onPress={() => handleSearch(search)}>
          <Feather
            style={{ marginLeft: 10 }}
            name="search"
            size={22}
            color={darkMode ? "#ffff" : "#000"}
          />
        </Pressable>

        <TextInput
          placeholder="Search countries..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            handleSearch(text);
          }}
          placeholderTextColor={darkMode ? "#ffff" : "#000"}
          style={{
            color: darkMode ? "#ffff" : "#000",
            width: "100%",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowLanguage(!showLanguage);
              console.log("i am");
            }}
            style={{
              borderRadius: 3,
              flexDirection: "row",
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              width: "auto",
              padding: 5,
              borderColor: "#d9d9d9",
            }}
          >
            <Fontisto
              name="world-o"
              size={15}
              color={darkMode ? "#ffff" : "#000"}
            />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                color: darkMode ? "#ffff" : "#000",
              }}
            >
              EN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilterDialogVisible(true)}
            style={{
              flexDirection: "row",
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              width: "auto",
              padding: 5,
              borderColor: "#d9d9d9",
            }}
          >
            <Ionicons
              name="funnel-outline"
              size={18}
              color={darkMode ? "#ffff" : "#000"}
            />
            <Text
              style={[
                {
                  borderRadius: 3,
                  fontSize: 18,
                  marginLeft: 5,
                  color: darkMode ? "#ffff" : "#000",
                },
              ]}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => <CountryItem country={item} />}
      />
      {/* Filter Dialog */}
      <Dialog.Container visible={filterDialogVisible}>
        <Dialog.Title>Filter</Dialog.Title>
        <View style={{ gap: 15 }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowContinent(!showContinent);
              }}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18 }}>Continent</Text>
              <SimpleLineIcons name="arrow-down" size={20} color="black" />
            </TouchableOpacity>
            {showContinent && (
              <FlatList
                data={continents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Dialog.Button
                    label={item}
                    onPress={() => handleContinentSelect(item)}
                  />
                )}
              />
            )}
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setTimezoneDialogVisible(!timezoneDialogVisible)}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18 }}>Time Zone</Text>
              <SimpleLineIcons name="arrow-down" size={20} color="black" />
            </TouchableOpacity>
            {timezoneDialogVisible && (
              <FlatList
                data={timezones}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Dialog.Button
                    label={item}
                    onPress={() => handleLanguageSelect(item)}
                  />
                )}
              />
            )}
          </View>

          <Dialog.Button
            label="Close"
            onPress={() => setFilterDialogVisible(false)}
          />
        </View>
      </Dialog.Container>
   <Dialog.Container visible={showLanguage}>
    <View style={{height:"90%"}}>
           <FlatList
                data={chosenLanguage}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }:{ item: Record<string, string> }) => {
                  const languages = Object.values(item) // Join values as a string
                  return (
                    <View style={{ padding: 10, borderColor: "#ddd" }}>
                      <Text>{languages}</Text>
                    </View>
                  );
                }
              } 
              />
          <Dialog.Button
            label="Close"
            style={{}}
            onPress={() => setShowLanguage(false)}
          />
          <Pressable onPress={() => console.log("i am working" , chosenLanguage)}><Text>click me</Text></Pressable>
        </View>
        </Dialog.Container>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f8f8f8", gap: 10 },
  loader: { flex: 1, justifyContent: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3,
  },
  flag: { width: 50, height: 30, marginRight: 10, borderRadius: 4 },
  countryName: { fontSize: 18, fontWeight: "bold" },
});
