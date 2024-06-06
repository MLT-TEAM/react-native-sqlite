import { Image, StyleSheet, Platform, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView>
        <View style={{ display: "flex", alignItems: 'center', justifyContent: "center"  }}>
          <Text>imagine here a page</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
