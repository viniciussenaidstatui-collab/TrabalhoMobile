import React, { useState } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function Logar() {
    if (email === '' || senha === '') {
      Alert.alert('ERRO', 'Favor Preencher todos os Campos!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/login_usuario', {
        email: email,
        senha: senha,
      });

      console.log(response.data);

      if (response.data.token) {
        const tokenSalvo = await AsyncStorage.setItem('token', response.data.token);
        console.log('✅ Token salvo:', response.data.token);
        console.log(tokenSalvo);
        Alert.alert('Sucesso', 'Login Realizado com Sucesso!');
        navigation.replace('cep');
      } else {
        Alert.alert('ERRO', response.data.msg);
      }

    } catch (error) {
      console.log('ERRO', error.response?.data?.errors || error.message);
      Alert.alert('Erro', 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  }

  function irParaCadastro() {
    navigation.navigate('Cadastro');
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.btnPrimary, loading && { backgroundColor: '#6c757d' }]}
            onPress={Logar}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>ENTRAR</Text>
            }
          </TouchableOpacity>

          {/* Botão de Cadastro */}
          <TouchableOpacity
            style={styles.btnCadastro}
            onPress={irParaCadastro}
          >
            <Text style={styles.btnCadastroText}>
              Não tem uma conta? <Text style={styles.linkText}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
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
  btnCadastro: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  btnCadastroText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});