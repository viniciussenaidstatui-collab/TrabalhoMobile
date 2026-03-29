import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  Alert 
} from 'react-native';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const logar = () => {
    if (user === '' || pass === '') {
      Alert.alert("Erro", "Preencha todos os campos!");
    } else {
      Alert.alert("Sucesso", `Bem-vindo, ${user}!`);
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        {/* Botão de voltar */}
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          
          <TextInput 
            style={styles.input}
            placeholder="E-mail" 
            placeholderTextColor="#ccc"
            value={user} 
            onChangeText={setUser} 
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput 
            style={styles.input}
            placeholder="Senha" 
            placeholderTextColor="#ccc"
            value={pass} 
            onChangeText={setPass} 
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={logar}>
            <Text style={styles.btnText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'white',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 24,
  }
});