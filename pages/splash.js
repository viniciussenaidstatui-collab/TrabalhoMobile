import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash({ navigation }) {
  useEffect(() => {
    const validacao = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("token.:", token);

      const time = setTimeout(() => {
        if (token) {
          navigation.replace("cep");
        } else {
          navigation.replace("Login");
        }
      }, 3000);

      return () => clearTimeout(time);
    };

    validacao();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/featured/samsung-galaxy-ltwgp25zr4bnvfam.jpg' }}
      style={styles.container}
    >
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000'
  },
  logo: {
    width: '80%',
    height: 200
  }
});