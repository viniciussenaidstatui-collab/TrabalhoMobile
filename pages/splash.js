import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Cadastro');
    }, 3000);

    return () => clearTimeout(timer);
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