import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
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

export default function AlteraItem({ navigation }) {
  const route = useRoute();
  const { produto } = route.params || {};

  const [cor, setCor] = useState('');
  const [ano, setAno] = useState('');
  const [modelo, setModelo] = useState('');
  const [aparelho, setAparelho] = useState('');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    if (produto) {
      setId(produto.id);
      setAparelho(produto.aparelho || '');
      setModelo(produto.modelo || '');
      setCor(produto.cor || '');
      setAno(produto.ano ? produto.ano.toString() : '');
    } else {
      Alert.alert('Erro', 'Nenhum produto selecionado para editar', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [produto]);

  useEffect(() => {
    async function carregarToken() {
      try {
        const t = await AsyncStorage.getItem('token');
        if (!t) {
          Alert.alert('Sessão expirada', 'Faça login novamente para continuar.', [
            { text: 'OK', onPress: () => navigation.replace('Login') },
          ]);
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

  async function handleAtualizar() {
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
      Alert.alert('Token não encontrado', 'Sua sessão expirou. Faça login novamente.', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
      return;
    }

    if (!id) {
      Alert.alert('Erro', 'ID do produto não encontrado');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        'http://10.0.2.2:8000/api/altera_loja',
        { id_loja: id, aparelho: aparelho.trim(), modelo: modelo.trim(), cor: cor.trim(), ano: anoNumero, token },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, timeout: 10000 }
      );

      if (response.data.erro === 'n') {
        Alert.alert('✅ Sucesso!', 'Produto atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        const mensagem = response.data.msg || 'Erro desconhecido';
        if (mensagem.includes('Token') || mensagem.includes('token')) {
          await AsyncStorage.removeItem('token');
          Alert.alert('Sessão expirada', 'Seu token expirou. Faça login novamente.', [
            { text: 'OK', onPress: () => navigation.replace('Login') },
          ]);
        } else {
          Alert.alert('Erro ao atualizar', mensagem);
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
        } else if (error.response.status === 403) {
          mensagemErro = 'Você não tem permissão para editar este produto.';
        } else if (error.response.status === 404) {
          mensagemErro = 'Produto não encontrado.';
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

  if (!produto) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Nenhum produto selecionado</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnSuccess}>
          <Text style={styles.btnText}>Voltar</Text>
        </TouchableOpacity>
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

              <Text style={styles.title}>Editar Produto</Text>

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
                style={[styles.btnWarning, loading && { backgroundColor: '#6c757d' }]}
                onPress={handleAtualizar}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.btnText}>ATUALIZAR PRODUTO</Text>
                }
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnCancelar}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Text style={styles.btnCancelarText}>Cancelar</Text>
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
  loadingText: { color: 'white', fontSize: 16, marginBottom: 20 },
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
  btnWarning: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnCancelar: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  btnCancelarText: { color: 'white', fontSize: 14 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});