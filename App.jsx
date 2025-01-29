import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header, SpeechToText } from "./src/components";
import { COLORS } from "./src/theme/colors";

const App = () => {
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
