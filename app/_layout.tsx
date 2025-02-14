import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown:false}} />
      <Stack.Screen name="details" options={{ title: "About" , headerShown:false}} />
    </Stack>
    </Provider>
  );
}
