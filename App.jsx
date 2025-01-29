import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header, SpeechToText } from "./src/components";
import { COLORS } from "./src/theme/colors";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SpeechToText />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white300,
  },
});

export default App;
