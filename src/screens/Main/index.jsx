import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header, SpeechToText } from '../../components';
import { COLORS } from '../../theme/colors';

const Main = () => {
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

export default Main;
