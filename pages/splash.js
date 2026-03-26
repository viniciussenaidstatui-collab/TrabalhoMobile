import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {

  useEffect(() => {
    // Espera 3 segundos e vai para o Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
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
    backgroundColor: '#000' // Fundo preto caso a imagem demore a carregar
  },
  logo: {
    width: '80%', // Usar porcentagem ajuda a não quebrar em telas menores
    height: 200
  }
});