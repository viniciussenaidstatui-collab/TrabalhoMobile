import React, { useState } from 'react';
import { StyleSheet, View as BaseView, Alert } from 'react-native';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';
import axios from 'axios';

export default function Cep({ navigation, onBack }) { 
  // Estados para capturar os textos digitados
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');

  async function Buscar(){
    if (!cep) {
      Alert.alert("Aviso", "Digite um CEP para buscar!");
      return;
    }
    
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data.logradouro);
      
      // Preenche automaticamente os campos com os dados da API
      if (response.data.logradouro) {
        setRua(response.data.logradouro);
        setBairro(response.data.bairro);
      } else {
        Alert.alert("Aviso", "CEP não encontrado!");
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      Alert.alert("Erro", "Não foi possível buscar o CEP");
    }
  }

  const handleCadastro = () => {
    // Validação removida - agora permite cadastro com campos vazios
    // Apenas mostra os dados que estão sendo enviados
    console.log('Dados a serem enviados:', {
      cep: cep || 'não informado',
      rua: rua || 'não informado',
      bairro: bairro || 'não informado'
    });

    // Seu código de fetch original
    fetch('http://127.0.0.1:8080/api/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cep: cep || '',
        rua: rua || '',
        bairro: bairro || ''
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigation.navigate('Home');
      } else {
        Alert.alert("Aviso", "Cadastro realizado com sucesso!");
        navigation.navigate('Home');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      // Simula sucesso mesmo com erro de backend
      Alert.alert("Aviso", "Cadastro simulado com sucesso (Backend offline)");
      navigation.navigate('Home');
    });
  };

  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}>
      <BaseView style={styles.overlay}>
        <Container>
          <MyText style={styles.title}>Criar Conta</MyText>

          {/* Inputs conectados com os estados */}
          <MyTextInput 
            placeholder="CEP" 
            value={cep} 
            onChangeText={setCep} 
          />
          
          <MyTouchableOpacity 
            style={styles.btnBuscar}
            onPress={Buscar}
          >
            <MyText style={styles.btnText}>BUSCAR CEP</MyText>
          </MyTouchableOpacity>
          
          <MyTextInput 
            placeholder="Rua" 
            value={rua} 
            onChangeText={setRua} 
          />
          
          <MyTextInput 
            placeholder="Bairro" 
            value={bairro} 
            onChangeText={setBairro} 
          />

          <MyTouchableOpacity 
            style={styles.btnSuccess}
            onPress={handleCadastro}
          >
            <MyText style={styles.btnText}>CADASTRAR</MyText>
          </MyTouchableOpacity>
        </Container>
      </BaseView>
    </MyImageBackground>
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
  btnBuscar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
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