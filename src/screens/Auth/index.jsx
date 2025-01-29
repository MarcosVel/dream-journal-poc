import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { GoogleSignin, GoogleSigninButton, isSuccessResponse } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Logo from '../../assets/mic.png';
import { AuthContext } from '../../context/UserContext';
import { COLORS } from '../../theme/colors';
import { useNavigation } from "@react-navigation/native";

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

const Auth = () => {
  const { setUser } = useContext(AuthContext);
  const { navigate } = useNavigation();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUser({ data: response.data, photo: response.data.user.photo });
        navigate('Main');
      } else {
        Alert.alert('Google Sign-In Error', response.error);
      }
    } catch (error) {
      Alert.alert('Google Sign-In Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={Logo} />
        <Text style={styles.title}>Dream Journal</Text>
      </View>

      <View style={styles.signInButtons}>
        <GoogleSigninButton size={GoogleSigninButton.Size.Wide} onPress={signInWithGoogle} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white100,
    marginTop: 8,
    shadowColor: COLORS.gray600,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  signInButtons: {
    marginTop: 'auto',
    marginBottom: 40,
  },
});

export default Auth;
