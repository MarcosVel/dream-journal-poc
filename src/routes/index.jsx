import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Auth, Main } from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Screen name="Auth" component={Auth} />
        <Screen
          name="Main"
          component={Main}
          options={{ gestureEnabled: false }} // prevent user from going back to Auth screen
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
