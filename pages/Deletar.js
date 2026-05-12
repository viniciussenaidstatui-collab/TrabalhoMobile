import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Deletar({ navigation }) {
  const route = useRoute();
  const { produto } = route.params || {};

  const [produtoData, setProdutoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    if (produto) {
      setProdutoData(produto);
    } else {
      Alert.alert('Erro', 'Nenhum produto selecionado para excluir', [
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

  async function handleDeletar() {
    if (!token) {
      Alert.alert('Token não encontrado', 'Sua sessão expirou. Faça login novamente.', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
      return;
    }
    if (!produtoData || !produtoData.id) {
      Alert.alert('Erro', 'ID do produto não encontrado');
      return;
    }
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o produto "${produtoData.aparelho}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => confirmarExclusao() },
      ]
    );
  }

  async function confirmarExclusao() {
    setLoading(true);
    try {
      const response = await axios.delete('http://10.0.2.2:8000/api/d_samsung', {
        params: { token, id_loja: produtoData.id },
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        timeout: 10000,
      });

      if (response.data.erro === 'n') {
        Alert.alert('✅ Sucesso!', 'Produto excluído com sucesso!', [
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
          Alert.alert('Erro ao excluir', mensagem);
        }
      }
    } catch (error) {
      let mensagemErro = 'Erro de conexão com o servidor';
      if (error.response) {
        if (error.response.status === 401) {
          mensagemErro = 'Token inválido ou expirado. Faça login novamente.';
          await AsyncStorage.removeItem('token');
          Alert.alert('Sessão expirada', mensagemErro, [
            { text: 'OK', onPress: () => navigation.replace('Login') },
          ]);
          return;
        } else if (error.response.status === 403) {
          mensagemErro = 'Você não tem permissão para excluir este produto.';
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

  if (!produtoData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Nenhum produto selecionado</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnDanger}>
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
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading} style={styles.backBtn}>
              <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Excluir Produto</Text>

            {/* Dados do produto */}
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Aparelho:</Text>
              <Text style={styles.infoValue}>{produtoData.aparelho}</Text>
              <Text style={styles.infoLabel}>Modelo:</Text>
              <Text style={styles.infoValue}>{produtoData.modelo}</Text>
              <Text style={styles.infoLabel}>Cor:</Text>
              <Text style={styles.infoValue}>{produtoData.cor}</Text>
              <Text style={styles.infoLabel}>Ano:</Text>
              <Text style={styles.infoValue}>{produtoData.ano}</Text>
            </View>

            <Text style={styles.aviso}>
              ⚠️ Esta ação não pode ser desfeita. O produto será permanentemente removido.
            </Text>

            <TouchableOpacity
              style={[styles.btnDanger, loading && { backgroundColor: '#6c757d' }]}
              onPress={handleDeletar}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>EXCLUIR PRODUTO</Text>
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
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  infoLabel: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 8,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aviso: {
    color: '#ffcccc',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  btnDanger: {
    backgroundColor: '#dc3545',
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