# Country Finder App

## Overview
The **Country Finder App** is a mobile application that allows users to view a list of countries, see detailed information about a selected country, filter countries by continent and time zone, change themes (light/dark mode), and deploy the app online for easy access.

## Features

### 1. Country List
- Fetches a list of countries from a REST API.
- Displays countries in a scrollable list.
- Implements a search function to find countries by name.
- Users can filter countries by **continent** and **time zone**.

### 2. Country Details
- When a country is selected, the app displays:
  - **Name**
  - **State/Provinces** (if available)
  - **Flag** (displayed as an image, supporting multiple images in a carousel)
  - **Population**
  - **Capital City**
  - **Current President** (if available)
  - **Continent**
  - **Country Code**

### 3. Theme Customization
- Users can toggle between **light mode** and **dark mode**.
- The theme applies across all app screens.

### 4. Filtering Options
- **Filter by Continent**: Users can filter countries based on their continent.
- **Filter by Time Zone**: Users can view all time zones and filter countries accordingly.
- Both filtering options appear in a bottom **dialog box** with a **FlatList** for selection.

### 5. Language Selection
- Users can select a language from a **radio button list**.
- The entire page content translates to the selected language.

### 6. App Deployment
- The app is deployed on **Appetize.io** for easy access and testing.
- The deployment link is shared for users to test on different devices and browsers.

## Technologies Used
- **React Native** (with Expo)
- **TypeScript**
- **Redux Toolkit** (for state management)
- **Axios** (for API requests)
- **React Native Navigation** (for screen transitions)
- **React Native Dialog** (for pop-up dialogs)

## Project Structure
```
CountryFinder/
│-- app/
│   ├── index.tsx  # Entry file
│   ├── Home.tsx  # Main screen listing all countries
│   ├── Details.tsx  # Screen displaying detailed country information
│   ├── components/
│   │   ├── CountryItem.tsx  # Reusable component to display country list items
│   │   ├── SearchBar.tsx  # Search input component
│   │   ├── ThemeSwitch.tsx  # Theme toggle switch
│   │   ├── FilterDialog.tsx  # Dialog box for filtering countries
│   │   ├── TimeZoneDialog.tsx  # Dialog box for selecting time zones
│   ├── redux/
│   │   ├── store.ts  # Redux store configuration
│   │   ├── themeSlice.ts  # Theme management slice
│   │   ├── languageSlice.ts  # Language selection slice
│   ├── styles/
│   │   ├── theme.ts  # Dark and light mode styles
│   ├── api/
│   │   ├── api.ts  # API calls using Axios
│-- assets/
│-- package.json
│-- README.md
```

## Setup and Installation

### Prerequisites
- Node.js installed
- Expo CLI installed (`npm install -g expo-cli`)

### Steps to Run the App
1. Clone the repository:
   ```sh
   git clone https://github.com/emmanuel-akinyemi-Dev/country-finder-app.git
   cd country-finder-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   expo start
   ```
4. Scan the QR code with the Expo Go app or run it on an emulator.

### Deployment to Appetize.io
1. Build the app using Expo:
   ```sh
   expo build:android
   ```
2. Upload the APK to Appetize.io.
3. Share the provided link for testing.

## API Information
- The app fetches country data from [REST Countries API](https://restcountries.com/v3.1/all).
- The data includes name, code, flag, capital, population, time zones, and continent.

## Contributions
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

---

### Authors
- **Emmanuel** - Developer

