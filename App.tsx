import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import OfflineNotice from "./app/components/OfflineNotice";

import navigationTheme from "./app/navigation/navigationTheme";
import authStorage from "./app/auth/storage";
import logger from "./app/utility/logger";

logger.start();

type User = {
  userId: number;
  name: string;
  email: string;
  iat: number;
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    setUser(user as User);
    setIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <GestureHandlerRootView>
        <NavigationContainer theme={navigationTheme}>
          <SafeAreaProvider style={styles.window}>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </SafeAreaProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
  },
});
