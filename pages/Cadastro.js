import React, { useState } from 'react';
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
import axios from 'axios';

export default function Cadastrar({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [gen, setGen] = useState('');
  const [loading, setLoading] = useState(false);

  function formatApi(data) {
    const parts = data.split('/');
    if (parts.length !== 3) return null;
    const [dia, mes, ano] = parts;
    return `${ano}-${mes}-${dia}`;
  }

  async function handleCadastro() {
    if (nome === '' || email === '' || senha === '' || telefone === '' || nascimento === '' || gen === '') {
      Alert.alert('ERRO', 'Preencher Todos os Campos');
      return;
    }

    const dataNascimento = formatApi(nascimento);
    if (!dataNascimento) {
      Alert.alert('ERRO', 'Data inválida. Use DD/MM/AAAA');
      return;
    }

    const values = {
      nome,
      email,
      senha,
      telefone,
      nascimento: dataNascimento,
      genero: gen,
    };

    setLoading(true);
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/cadastra_usuario', values);
      console.log(response.data)
      Alert.alert('Sucesso', 'Usuário cadastrado com Sucesso', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);

    } catch (error) {
      console.log('ERRO', error);
      const mensagem = error.response?.data?.message || 'Erro de conexão com o servidor';
      Alert.alert('Erro', mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
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
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={nascimento}
            onChangeText={setNascimento}
          />
          <TextInput
            style={styles.input}
            placeholder="Gênero"
            placeholderTextColor="#ccc"
            value={gen}
            onChangeText={setGen}
          />

          <TouchableOpacity
            style={[styles.btnSuccess, loading && { backgroundColor: '#6c757d' }]}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>CADASTRAR</Text>
            }
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 25,
    textAlign: 'center',
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
  btnSuccess: {
    backgroundColor: '#28a745',
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
});