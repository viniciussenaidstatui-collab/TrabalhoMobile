import React from 'react';
import { StyleSheet, View as BaseView } from 'react-native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';


export default function Cadastro({ navigation, onBack }) { 
  // Agora recebe navigation como prop

  const handleCadastro = () => {
    // Aqui você faria a requisição para o backend
    // Exemplo:
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
    .catch(error => console.error('Erro:', error));
  };

  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}>
      <BaseView style={styles.overlay}>
        
        <MyTouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack() || onBack?.()} // Usa navigation.goBack() se disponível
        >
          <MyText style={styles.backText}>←</MyText>
        </MyTouchableOpacity>

        <Container>

          <MyText style={styles.title}>Criar Conta</MyText>

          <MyTextInput placeholder="Nome Completo"/>
          <MyTextInput placeholder="E-mail" keyboardType="email-address"/>
          <MyTextInput placeholder="Senha" secureTextEntry/>

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