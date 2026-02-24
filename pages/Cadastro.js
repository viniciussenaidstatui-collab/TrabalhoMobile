import React from 'react';
import { StyleSheet, View as BaseView } from 'react-native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

export default function Cadastro() {
  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}>
      <BaseView style={styles.overlay}>
        <Container>
          <MyText style={styles.title}>Criar Conta</MyText>
          
          <MyTextInput placeholder="Nome Completo" />
          <MyTextInput placeholder="E-mail" keyboardType="email-address" />
          <MyTextInput placeholder="Senha" secureTextEntry />

          <MyTouchableOpacity style={styles.btnSuccess}>
            <MyText style={styles.btnText}>CADASTRAR</MyText>
          </MyTouchableOpacity>
        </Container>
      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  btnSuccess: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});