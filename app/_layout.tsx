import { useFonts } from "expo-font";
import { Navigator, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/composable/DBconnection";
import NotFoundScreen from "./+not-found";
import { SafeAreaView, Text, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);



  if (!loaded) {
    return <Text>loading...</Text>;
  }

  return (
    <Suspense fallback={<ErrorLoadDB/>} >
      <SQLiteProvider
        databaseName="app.db"
        onInit={migrateDbIfNeeded}
        useSuspense
      >
        <PaperProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

function ErrorLoadDB() {
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <ActivityIndicator></ActivityIndicator>

      </View>
    </SafeAreaView>
  );
}
