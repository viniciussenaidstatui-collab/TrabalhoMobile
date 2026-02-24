import React from 'react';
import { StyleSheet, View as BaseView } from 'react-native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

export default function Login() {
  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926' }}>
      <BaseView style={styles.overlay}>
        <Container>
          <MyText style={styles.title}>Login</MyText>
          
          <MyTextInput placeholder="E-mail" keyboardType="email-address" />
          <MyTextInput placeholder="Senha" secureTextEntry />

          <MyTouchableOpacity style={styles.btnPrimary}>
            <MyText style={styles.btnText}>ENTRAR</MyText>
          </MyTouchableOpacity>
        </Container>
      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  btnPrimary: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});