import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dream Journal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: COLORS.white500,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 24,
    marginBottom: 16,
  },
});

export default Header;
