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

export default function Cadastro({ navigation }) { 
  // Estados para capturar o texto digitado
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Verificação básica
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // Lógica de envio (Mantendo sua estrutura original)
    fetch('http://127.0.0.1:8080/api/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        navigation.navigate('Login');
      }
    })
    .catch(error => {
      // O Alerta que você pediu para manter (Falsa confirmação)
      console.log('Erro de rede esperado:', error);
      Alert.alert("Aviso", "Cadastro simulado com sucesso (Backend offline)");
      navigation.navigate('Login');
    });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        {/* Botão Voltar */}
       

        <View style={styles.container}>
          <Text style={styles.title}>Criar Conta</Text>

          <TextInput 
            style={styles.input}
            placeholder="Nome Completo" 
            placeholderTextColor="#ccc"
            value={nome} 
            onChangeText={setNome} 
          />
          
          <TextInput 
            style={styles.input}
            placeholder="E-mail" 
            placeholderTextColor="#ccc"
            keyboardType="email-address" 
            autoCapitalize="none"
            value={email} 
            onChangeText={setEmail} 
          />
          
          <TextInput 
            style={styles.input}
            placeholder="Senha" 
            placeholderTextColor="#ccc"
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
          />

          <TouchableOpacity 
            style={styles.btnSuccess}
            onPress={handleCadastro}
          >
            <Text style={styles.btnText}>CADASTRAR</Text>
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
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 25,
    textAlign: 'center'
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
  backButton: {
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
  backText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});