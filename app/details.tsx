import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { themeStyles } from "../styles/themeStyle";
import axios from "axios";
import Carousel from "react-native-reanimated-carousel";

// Define the Currency type
type Currency = {
  name: string;
  symbol: string;
};

const { width: screenWidth } = Dimensions.get("window");

const DetailScreen = () => {
  const params = useLocalSearchParams();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [countryDetails, setCountryDetails] = useState<any>(null);

  // Helper function to handle null/undefined values
  const getValue = (value: any) => (value ? value : "N/A");

  // Fetch country details from the API
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${params.name}?fullText=true`
        );
        setCountryDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchCountryDetails();
  }, [params.name]);

  if (!countryDetails) {
    return (
      <Text style={[styles.loadingText, { color: darkMode ? "#fff" : "#000" }]}>
        Loading...
      </Text>
    );
  }

  // Prepare images for the carousel
  const images = [
    { id: "flag", uri: countryDetails.flags.png },
    { id: "coatOfArms", uri: countryDetails.coatOfArms?.png },
  ].filter((image) => image.uri); // Filter out undefined URIs

  // Render carousel item
  const renderCarouselItem = ({
    item,
  }: {
    item: { id: string; uri: string };
  }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.uri }} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        darkMode ? themeStyles.darkContainer : themeStyles.lightContainer,
      ]}
    >
      {/* Country Name */}
      <Text style={[styles.name, { color: darkMode ? "#fff" : "#000" }]}>
        {countryDetails.name.common}
      </Text>

      {/* Carousel for Images */}
      <Carousel
        width={screenWidth}
        height={200}
        data={images}
        renderItem={renderCarouselItem}
        loop
        autoPlay
        autoPlayInterval={3000}
      />

      {/* General Information */}
      <View style={styles.section}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Official Name:</Text>{" "}
          {getValue(countryDetails.name.official)}
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Capital City:</Text>{" "}
          {getValue(countryDetails.capital?.join(", "))}
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Population:</Text>{" "}
          {getValue(countryDetails.population?.toLocaleString())}
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Continent:</Text>{" "}
          {getValue(countryDetails.region)}
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Subregion:</Text>{" "}
          {getValue(countryDetails.subregion)}
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Area:</Text>{" "}
          {getValue(countryDetails.area?.toLocaleString())} km²
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Country Code:</Text>{" "}
          {getValue(countryDetails.cca2)}
        </Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          <Text style={styles.boldText}>Timezone:</Text>{" "}
          {getValue(countryDetails.timezones?.join(", "))}
        </Text>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}
        >
          Languages
        </Text>
        {countryDetails.languages ? (
          Object.entries(countryDetails.languages).map(([code, language]) => (
            <Text
              key={code}
              style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}
            >
              {language as string}{" "}
              {/* Explicitly cast `language` to `string` */}
            </Text>
          ))
        ) : (
          <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
            N/A
          </Text>
        )}
      </View>

      {/* Currencies */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}
        >
          Currencies
        </Text>
        {countryDetails.currencies ? (
          Object.entries(countryDetails.currencies).map(([code, currency]) => (
            <Text
              key={code}
              style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}
            >
              {(currency as Currency).name} ({(currency as Currency).symbol})
            </Text>
          ))
        ) : (
          <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
            N/A
          </Text>
        )}
      </View>

      {/* Borders */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}
        >
          Bordering Countries
        </Text>
        {countryDetails.borders ? (
          countryDetails.borders.map((border: string, index: number) => (
            <Text
              key={index}
              style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}
            >
              {border}
            </Text>
          ))
        ) : (
          <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
            N/A
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 16,
  },
  carouselItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding:10
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginHorizontal:20,
    marginRight:50
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default DetailScreen;
