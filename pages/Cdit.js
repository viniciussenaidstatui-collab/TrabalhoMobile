import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CriaItem({ navigation }) {
  const [cor, setCor] = useState('');
  const [ano, setAno] = useState('');
  const [modelo, setModelo] = useState('');
  const [aparelho, setAparelho] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    async function carregarToken() {
      try {
        const t = await AsyncStorage.getItem('token');
        if (!t) {
          Alert.alert(
            'Sessão expirada',
            'Faça login novamente para continuar.',
            [{ text: 'OK', onPress: () => navigation.replace('Login') }]
          );
          setCarregandoToken(false);
          return;
        }
        setToken(t);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível verificar sua sessão.');
      } finally {
        setCarregandoToken(false);
      }
    }
    carregarToken();
  }, []);

  async function handleSalvar() {
    if (!aparelho.trim() || !modelo.trim() || !cor.trim() || !ano.trim()) {
      Alert.alert('Campos incompletos', 'Por favor, preencha todos os campos.');
      return;
    }

    const anoNumero = parseInt(ano);
    if (isNaN(anoNumero) || anoNumero < 2000 || anoNumero > new Date().getFullYear() + 1) {
      Alert.alert('Ano inválido', 'Por favor, insira um ano válido (2000-' + (new Date().getFullYear() + 1) + ')');
      return;
    }

    if (!token) {
      Alert.alert(
        'Token não encontrado',
        'Sua sessão expirou. Faça login novamente.',
        [{ text: 'OK', onPress: () => navigation.replace('Login') }]
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://10.0.2.2:8000/api/salva_samsung',
        { aparelho: aparelho.trim(), modelo: modelo.trim(), cor: cor.trim(), ano: anoNumero, token },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, timeout: 10000 }
      );

      if (response.data.erro === 'n') {
        Alert.alert('✅ Sucesso!', 'Produto cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
        setAparelho(''); setModelo(''); setCor(''); setAno('');
      } else {
        const mensagem = response.data.msg || 'Erro desconhecido';
        if (mensagem.includes('Token') || mensagem.includes('token')) {
          await AsyncStorage.removeItem('token');
          Alert.alert('Sessão expirada', 'Seu token expirou. Faça login novamente.', [
            { text: 'OK', onPress: () => navigation.replace('Login') },
          ]);
        } else {
          Alert.alert('Erro ao cadastrar', mensagem);
        }
      }
    } catch (error) {
      let mensagemErro = 'Erro de conexão com o servidor';
      if (error.response) {
        if (error.response.status === 401) {
          mensagemErro = 'Token inválido ou expirado. Faça login novamente.';
          await AsyncStorage.removeItem('token');
        } else if (error.response.status === 422) {
          mensagemErro = 'Dados inválidos. Verifique as informações.';
        } else if (error.response.status === 500) {
          mensagemErro = 'Erro interno no servidor. Tente novamente mais tarde.';
        } else {
          mensagemErro = error.response.data?.msg || error.response.data?.message || 'Erro no servidor';
        }
      } else if (error.request) {
        mensagemErro = 'Servidor não respondeu. Verifique sua conexão.';
      } else {
        mensagemErro = error.message || 'Erro desconhecido';
      }
      Alert.alert('Erro', mensagemErro);
    } finally {
      setLoading(false);
    }
  }

  if (carregandoToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Text style={styles.backText}>← Voltar</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Cadastrar Produto</Text>

              <TextInput
                style={styles.input}
                placeholder="Aparelho (Ex: Galaxy S24 Ultra)"
                placeholderTextColor="#ccc"
                value={aparelho}
                onChangeText={setAparelho}
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Modelo (Ex: SM-S928B)"
                placeholderTextColor="#ccc"
                value={modelo}
                onChangeText={setModelo}
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Cor (Ex: Preto Titânio)"
                placeholderTextColor="#ccc"
                value={cor}
                onChangeText={setCor}
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Ano (Ex: 2024)"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                maxLength={4}
                value={ano}
                onChangeText={setAno}
                editable={!loading}
              />

              <TouchableOpacity
                style={[styles.btnSuccess, loading && { backgroundColor: '#6c757d' }]}
                onPress={handleSalvar}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.btnText}>SALVAR PRODUTO</Text>
                }
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
  },
  backBtn: { marginBottom: 10 },
  backText: { color: '#ccc', fontSize: 14 },
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
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});