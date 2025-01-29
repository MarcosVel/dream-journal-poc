import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../context/UserContext';
import { COLORS } from '../../theme/colors';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photo }} style={styles.userPhoto} />
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
    marginBottom: 16,
  },
  userPhoto: {
    position: 'absolute',
    top: 8,
    left: 20,
    width: 32,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: '50%',
    borderColor: COLORS.gray100,
  }
});

export default Header;
