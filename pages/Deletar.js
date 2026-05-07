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
      Alert.alert(
        'Erro',
        'Nenhum produto selecionado para excluir',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [produto]);

  useEffect(() => {
    async function carregarToken() {
      try {
        console.log('🔍 Carregando token do AsyncStorage...');
        const t = await AsyncStorage.getItem('token');
        console.log('📦 Token encontrado:', t ? `${t.substring(0, 20)}...` : 'NENHUM');
        
        if (!t) {
          console.log('❌ Token não encontrado!');
          Alert.alert(
            'Sessão expirada', 
            'Faça login novamente para continuar.',
            [{ 
              text: 'OK', 
              onPress: () => navigation.replace('Login') 
            }]
          );
          setCarregandoToken(false);
          return;
        }
        
        setToken(t);
        console.log('✅ Token carregado com sucesso!');
        
      } catch (error) {
        console.error('❌ Erro ao carregar token:', error);
        Alert.alert('Erro', 'Não foi possível verificar sua sessão.');
      } finally {
        setCarregandoToken(false);
      }
    }
    
    carregarToken();
  }, []);

  async function handleDeletar() {
    if (!token) {
      Alert.alert(
        'Token não encontrado', 
        'Sua sessão expirou. Faça login novamente.',
        [{ text: 'OK', onPress: () => navigation.replace('Login') }]
      );
      return;
    }

    if (!produtoData || !produtoData.id) {
      Alert.alert('Erro', 'ID do produto não encontrado');
      return;
    }

    // Confirmar exclusão
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o produto "${produtoData.aparelho}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: confirmarExclusao
        }
      ]
    );
  }

  async function confirmarExclusao() {
    console.log('🚀 Enviando requisição de exclusão...');
    console.log('📤 ID do produto:', produtoData.id);
    console.log('🔑 Token:', token.substring(0, 20) + '...');

    setLoading(true);
    
    try {
      // CORRIGIDO: Usando a rota correta '/d_samsung' com método DELETE
      const response = await axios.delete(
        'http://10.0.2.2:8000/api/d_samsung',
        {
          data: {
            id_loja: produtoData.id,
            token: token,
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('📥 Resposta do servidor:', response.data);

      if (response.data.erro === 'n') {
        Alert.alert(
          '✅ Sucesso!', 
          'Produto excluído com sucesso!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        
      } else {
        const mensagem = response.data.msg || 'Erro desconhecido';
        console.log('❌ Erro retornado pelo servidor:', mensagem);
        
        if (mensagem.includes('Token') || mensagem.includes('token')) {
          await AsyncStorage.removeItem('token');
          Alert.alert(
            'Sessão expirada',
            'Seu token expirou. Faça login novamente.',
            [{ text: 'OK', onPress: () => navigation.replace('Login') }]
          );
        } else {
          Alert.alert('Erro ao excluir', mensagem);
        }
      }

    } catch (error) {
      console.log('❌ ERRO NA REQUISIÇÃO:', error);
      
      let mensagemErro = 'Erro de conexão com o servidor';
      
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Dados do erro:', error.response.data);
        
        if (error.response.status === 401) {
          mensagemErro = 'Token inválido ou expirado. Faça login novamente.';
          await AsyncStorage.removeItem('token');
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
      
      // Se houve erro, não fecha a tela
      if (error.response?.status !== 404) {
        // Se for erro de conexão, permite tentar novamente
        Alert.alert(
          'Tentar novamente?',
          'Deseja tentar excluir o produto novamente?',
          [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: handleDeletar }
          ]
        );
      }
      
    } finally {
      setLoading(false);
    }
  }

  if (carregandoToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dc3545" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!produtoData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Nenhum produto selecionado</Text>
        <TouchableOpacity
          style={styles.backBtnError}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backTextError}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView 
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.headerIcon}>
              <Text style={styles.titleIcon}>🗑️</Text>
              <Text style={styles.title}>Excluir Produto</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Produto selecionado:</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📱 Aparelho:</Text>
                <Text style={styles.infoValue}>{produtoData.aparelho}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>🔧 Modelo:</Text>
                <Text style={styles.infoValue}>{produtoData.modelo}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>🎨 Cor:</Text>
                <Text style={styles.infoValue}>{produtoData.cor}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📅 Ano:</Text>
                <Text style={styles.infoValue}>{produtoData.ano}</Text>
              </View>
            </View>

            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Esta ação não pode ser desfeita. O produto será permanentemente removido do sistema.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.btnDeletar, loading && styles.btnDisabled]}
              onPress={handleDeletar}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Text style={styles.btnIcon}>🗑️</Text>
                  <Text style={styles.btnText}>EXCLUIR PRODUTO</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>

            {/* Informação do ID (debug) */}
            {__DEV__ && produtoData.id && (
              <View style={styles.debugInfo}>
                <Text style={styles.debugText}>
                  ID do Produto: {produtoData.id}
                </Text>
                <Text style={styles.debugText}>
                  Token: {token ? token.substring(0, 30) : 'Não carregado'}...
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    marginTop: 10,
    color: '#dc3545',
    fontSize: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(220, 53, 69, 0.3)',
  },
  backBtn: {
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  backBtnError: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#dc3545',
    borderRadius: 10,
  },
  backText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
  backTextError: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerIcon: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  warningBox: {
    backgroundColor: 'rgba(220, 53, 69, 0.2)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(220, 53, 69, 0.5)',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  warningText: {
    color: '#ff6b6b',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  btnDeletar: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btnCancelar: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  btnCancelarText: {
    color: 'white',
    fontSize: 14,
  },
  btnDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.7,
  },
  btnIcon: {
    fontSize: 18,
    color: 'white',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  debugInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
  },
  debugText: {
    color: '#4ecdc4',
    fontSize: 10,
    textAlign: 'center',
  },
});