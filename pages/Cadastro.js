import React from 'react';
import { StyleSheet, View as BaseView } from 'react-native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

export default function Cadastro({ onBack }) { // Adicionada a prop onBack
  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}>
      <BaseView style={styles.overlay}>
        
        {/* Botão de Voltar */}
        <MyTouchableOpacity style={styles.backButton} onPress={onBack}>
          <MyText style={styles.backText}>←</MyText>
        </MyTouchableOpacity>

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
  btnText: { color: 'white', fontWeight: 'bold' },
  // Estilo da Seta
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(255,255,255,0.3)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  backText: { color: 'white', fontSize: 24, fontWeight: 'bold' }
});