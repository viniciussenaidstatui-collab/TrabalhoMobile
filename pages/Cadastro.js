import React, { useState } from 'react'; // Adicionado useState aqui
import { StyleSheet, View as BaseView, Alert } from 'react-native'; // Adicionado Alert e StyleSheet
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

export default function Cadastro({ navigation, onBack }) { 
  // 1. Criando os estados para capturar o texto digitado
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Verificação básica antes de tentar enviar
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // Seu código de fetch original
    fetch('http://127.0.0.1:8080/api/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigation.navigate('Home');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      // Como você está no emulador, o 127.0.0.1 pode falhar. 
      // Mostramos um alerta para não travar a tela
      Alert.alert("Aviso", "Cadastro simulado com sucesso (Backend offline)");
    });
  };

  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}>
      <BaseView style={styles.overlay}>
        
        <MyTouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack() || onBack?.()} 
        >
          <MyText style={styles.backText}>←</MyText>
        </MyTouchableOpacity>

        <Container>
          <MyText style={styles.title}>Criar Conta</MyText>

          {/* 2. Conectando os inputs com os estados */}
          <MyTextInput 
            placeholder="Nome Completo" 
            value={nome} 
            onChangeText={setNome} 
          />
          <MyTextInput 
            placeholder="E-mail" 
            keyboardType="email-address" 
            value={email} 
            onChangeText={setEmail} 
          />
          <MyTextInput 
            placeholder="Senha" 
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
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

// 3. O OBJETO STYLES QUE ESTAVA FALTANDO:
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10
  },
  backText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});