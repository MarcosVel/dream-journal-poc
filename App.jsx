import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from "react";
import { AuthProvider } from './src/context/UserContext';
import Routes from './src/routes';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};


export default App;
