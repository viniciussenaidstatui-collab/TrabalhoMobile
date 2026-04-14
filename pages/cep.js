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

      {/* MENU RETRÁTIL */}
      {menuAberto && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setMenuAberto(false);
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.menuText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setMenuAberto(false);
              navigation.navigate('Cadastro');
            }}
          >
            <Text style={styles.menuText}>Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setMenuAberto(false);
              navigation.navigate('Home');
            }}
          >
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Buscar CEP</Text>
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

  // NAVBAR
  navbar: {
    height: 80,
    backgroundColor: '#2c2c2c',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuIcon: {
    color: 'white',
    fontSize: 28,
    marginRight: 15,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#3a3a3a',
  },
  menuBtn: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#555',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },

  // CONTEÚDO
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    height: 50,
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultadoContainer: {
    marginTop: 20,
  },
  textoResultado: {
    color: '#555',
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});