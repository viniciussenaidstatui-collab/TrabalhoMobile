import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './pages/splash';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">

        <Stack.Screen
          name="splash"
          component={Splash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
import Home from './pages/Home'; // Ou troque para Cadastro

export default function App() {
  return <Home />;main
}