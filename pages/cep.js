import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function BuscaCep({ navigation }) {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const handleBuscarCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(response.data);
        Alert.alert('Sucesso', 'Olha teu cep ae');
      }
    } catch (error) {
      console.log('Erro na busca:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao serviço de CEP.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setMenuAberto(!menuAberto)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>SAMSUNG STORE</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      {/* MENU RETRÁTIL */}
      {menuAberto && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Login'); }}>
            <Text style={styles.menuText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Cadastro'); }}>
            <Text style={styles.menuText}>Cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Home'); }}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Buscar CEP da Loja</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o CEP (Ex: 01001000)"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            maxLength={8}
            value={cep}
            onChangeText={setCep}
          />

          <TouchableOpacity style={styles.btnSuccess} onPress={handleBuscarCep}>
            <Text style={styles.btnText}>PROCURAR</Text>
          </TouchableOpacity>

          {endereco && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.textoResultado}>
                <Text style={styles.label}>Rua: </Text>{endereco.logradouro}
              </Text>
              <Text style={styles.textoResultado}>
                <Text style={styles.label}>Bairro: </Text>{endereco.bairro}
              </Text>
              <Text style={styles.textoResultado}>
                <Text style={styles.label}>Cidade: </Text>{endereco.localidade} - {endereco.uf}
              </Text>
              <Text style={styles.textoResultado}>
                <Text style={styles.label}>Região: </Text>{endereco.regiao}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  navbar: {
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuIcon: { color: 'white', fontSize: 28, marginRight: 15 },
  navTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  menuContainer: { backgroundColor: 'rgba(0,0,0,0.7)' },
  menuBtn: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  menuText: { color: 'white', fontSize: 16 },
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
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  backBtn: { marginVertical: 10, marginHorizontal: 20 },
  backText: { color: '#ccc', fontSize: 14 },
  resultadoContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  textoResultado: { color: 'white', fontSize: 15, marginBottom: 6 },
  label: { fontWeight: 'bold', color: '#ccc' },
});