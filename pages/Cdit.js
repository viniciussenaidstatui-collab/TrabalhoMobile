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

    console.log('🚀 Enviando requisição...');
    console.log('📤 Dados:', { aparelho, modelo, cor, ano: anoNumero });
    console.log('🔑 Token:', token.substring(0, 20) + '...');

    setLoading(true);
    
    try {
      const response = await axios.post(
        'http://10.0.2.2:8000/api/salva_samsung',
        {
          aparelho: aparelho.trim(),
          modelo: modelo.trim(),
          cor: cor.trim(),
          ano: anoNumero,
          token: token, 
        },
        {
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
          'Produto cadastrado com sucesso!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        
    
        setAparelho('');
        setModelo('');
        setCor('');
        setAno('');
        
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
          Alert.alert('Erro ao cadastrar', mensagem);
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
        <ActivityIndicator size="large" color="#6f42c1" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200' }}
      style={styles.background}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
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
              >
                <Text style={styles.backText}>← Voltar</Text>
              </TouchableOpacity>

              
              <View style={styles.headerIcon}>
                <Text style={styles.titleIcon}>📱</Text>
                <Text style={styles.title}>Cadastrar Produto</Text>
              </View>

              
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    <Text style={styles.labelIcon}>📱</Text> Aparelho
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Galaxy S24 Ultra"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={aparelho}
                    onChangeText={setAparelho}
                    editable={!loading}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    <Text style={styles.labelIcon}>🔧</Text> Modelo
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: SM-S928B"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={modelo}
                    onChangeText={setModelo}
                    editable={!loading}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    <Text style={styles.labelIcon}>🎨</Text> Cor
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Preto Titânio"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={cor}
                    onChangeText={setCor}
                    editable={!loading}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    <Text style={styles.labelIcon}>📅</Text> Ano
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 2024"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                    value={ano}
                    onChangeText={setAno}
                    maxLength={4}
                    editable={!loading}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.btnSalvar, loading && styles.btnDisabled]}
                  onPress={handleSalvar}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <>
                      <Text style={styles.btnIcon}>💾</Text>
                      <Text style={styles.btnText}>SALVAR PRODUTO</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {__DEV__ && token && (
                <View style={styles.debugInfo}>
                  <Text style={styles.debugText}>
                    Token: {token.substring(0, 30)}...
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1 
  },
  keyboardView: {
    flex: 1,
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
    color: '#6f42c1',
    fontSize: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(111, 66, 193, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  backBtn: {
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#6f42c1',
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
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 5,
  },
  labelIcon: {
    marginRight: 5,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  btnSalvar: {
    backgroundColor: '#6f42c1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
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