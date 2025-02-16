import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Fetch all countries
export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    return [];
  }
};

// Fetch countries by name
export const fetchCountriesByName = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by name:', error);
    return [];
  }
};

// Fetch countries by language
export const fetchCountriesByLanguage = async (language: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/lang/${language}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by language:', error);
    return [];
  }
};

// Fetch countries by continent
export const fetchCountriesByContinent = async (region: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by continent:', error);
    return [];
  }
};

// Fetch countries with specific fields
export const fetchCountriesWithFields = async (service: string, fields: string[]) => {
  try {
    const fieldsQuery = fields.join(',');
    const response = await axios.get(`${BASE_URL}/${service}?fields=${fieldsQuery}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries with specific fields:', error);
    return [];
  }
};

// Get unique languages from all countries
export const getUniqueLanguages = async () => {
  try {
    const countries = await fetchAllCountries();
    const languages = new Set<string>();
    countries.forEach((country:any) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang:any) => languages.add(lang));
      }
    });
    return Array.from(languages);
  } catch (error) {
    console.error('Error fetching unique languages:', error);
    return [];
  }
};

// Get unique continents from all countries
export const getUniqueContinents = async () => {
  try {
    const countries = await fetchAllCountries();
    console.log("Fetched countries:", countries);
    const continents = new Set<string>();
    countries.forEach((country:any) => {
      if (country.region) {
        continents.add(country.region);
      }
    });
    return Array.from(continents);
  } catch (error) {
    console.error('Error fetching unique continents:', error);
    return [];
  }
};

// Get unique timezones from all countries
export const getUniqueTimezones = async () => {
  
  try {
    const countries = await fetchAllCountries();
    const timezones = new Set<string>();
    countries.forEach((country:any) => {
      if (country.timezones) {
        country.timezones.forEach((tz:string) => timezones.add(tz));
      }
    });
    return Array.from(timezones);
  } catch (error) {
    console.error('Error fetching unique timezones:', error);
    return [];
  }
};