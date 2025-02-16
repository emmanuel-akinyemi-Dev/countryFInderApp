import React, { useState, useEffect } from "react";
import { RootState } from "../redux/store";
import { themeStyles } from "../styles/themeStyle";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  fetchCountriesByContinent,
  fetchCountriesWithFields,
  getUniqueTimezones,
  fetchAllCountries,
} from "../api/api";
import { darkTheme } from "../styles/globalStyle";

const FilterPopup = ({
  visible,
  onClose,
  onApply,
}: {
  visible: boolean;
  onClose: any;
  onApply: any;
}) => {

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [timezones, setTimezones] = useState<string[]>([]);
  useEffect(() => {
    const fetchTimezones = async () => {
      const uniqueTimezones = await getUniqueTimezones();
      setTimezones(uniqueTimezones);
    };
    fetchTimezones();
  }, []);

  const handleApply = async () => {
    const allCountries = await fetchAllCountries();

    let filteredCountries = allCountries;

    if (selectedContinents.length > 0) {
      const continentResults = await Promise.all(
        selectedContinents.map((continent) =>
          fetchCountriesByContinent(continent)
        )
      );
      filteredCountries = continentResults.flat();
    }

    if (selectedTimezones.length > 0) {
      const timezoneResults = await fetchCountriesWithFields("all", [
        "timezones",
      ]);
      filteredCountries = filteredCountries.filter((country: any) =>
        country.timezones.some((tz: string) => selectedTimezones.includes(tz))
      );
    }

    onApply(filteredCountries);
    onClose();
  };
  const handleReset = () => {
    setSelectedContinents([]);
    setSelectedTimezones([]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor:darkMode? "#000F24" :"white"}]} >
          <Text style={[styles.title, {color:darkMode? "white": "#000"}]}>Filter</Text>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setExpandedSection(
                expandedSection === "continents" ? null : "continents"
              )
            }
          >
            <Text style={[styles.sectionTitle, {color:darkMode? "white": "#000"}]}>Continents</Text>
          </TouchableOpacity>
          {expandedSection === "continents" && (
            <FlatList
              data={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.filterItem}
                  onPress={() => {
                    if (selectedContinents.includes(item)) {
                      setSelectedContinents(
                        selectedContinents.filter((c) => c !== item)
                      );
                    } else {
                      setSelectedContinents([...selectedContinents, item]);
                    }
                  }}
                >
                  <Text style={{color:darkMode? "white": "#000"}}>{item}</Text>
                  <View style={styles.checkbox}>
                    {selectedContinents.includes(item) && <Text style={{color:darkMode? "white": "#000"}}>✓</Text>}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          <TouchableOpacity
            onPress={() =>
              setExpandedSection(
                expandedSection === "timezones" ? null : "timezones"
              )
            }
          >
            <Text style={[styles.sectionTitle, {color:darkMode? "white": "#000"}]}>Timezones</Text>
          </TouchableOpacity>
          {expandedSection === "timezones" && (
            <FlatList
              data={timezones}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.filterItem}
                  onPress={() => {
                    if (selectedTimezones.includes(item)) {
                      setSelectedTimezones(
                        selectedTimezones.filter((tz) => tz !== item)
                      );
                    } else {
                      setSelectedTimezones([...selectedTimezones, item]);
                    }
                  }}
                >
                  <Text style={{color:darkMode? "white": "#000"}}>{item}</Text>
                  <View style={styles.checkbox}>
                    {selectedTimezones.includes(item) && <Text style={{color:darkMode? "white": "#000"}}>✓</Text>}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
            }}
          >
            <TouchableOpacity style={[styles.closeButton, ]} onPress={handleReset}>
              <Text style={{color:darkMode? "white": "#000"}}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: { 
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: "#98A2B3",
    borderRadius: 5,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: "#FF6C00",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 8,
    width: "60%",
    height: "80%",
  },
  closeButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 8,
    width: "35%",
    height: "80%",
  },
});

export default FilterPopup;
