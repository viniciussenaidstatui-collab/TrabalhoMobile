import React, { useState } from 'react'; // Corrigido o import do useState
import { StyleSheet, View as BaseView, Alert } from 'react-native';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

// Você precisa declarar a função e exportá-la
export default function Login({ navigation }) {
  
  // Criando as variáveis para guardar o que o usuário digita
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // Função que é chamada ao clicar no botão ENTRAR
  const logar = () => {
    if (user === '' || pass === '') {
      Alert.alert("Erro", "Preencha todos os campos!");
    } else {
      Alert.alert("Sucesso", `Bem-vindo, ${user}!`);
      // Aqui você poderia usar: navigation.navigate('Home')
    }
  };

  return (
    <MyImageBackground source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926' }}>
      <BaseView style={styles.overlay}>
        
        <MyTouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <MyText style={styles.menuText}>←</MyText>
        </MyTouchableOpacity>

        <Container>
          <MyText style={styles.title}>Login</MyText>
          
          <MyTextInput 
            placeholder={"E-mail"} 
            value={user} 
            onChangeText={setUser} 
            keyboardType="email-address"
          />

          <MyTextInput 
            placeholder={"Senha"} 
            value={pass} // Corrigido de 'user' para 'pass'
            onChangeText={setPass} 
            secureTextEntry
          />

          <MyTouchableOpacity style={styles.btnPrimary} onPress={logar}>
            <MyText style={styles.btnText}>ENTRAR</MyText>
          </MyTouchableOpacity>

        </Container>

      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20,
    color: 'white' // Adicionei cor branca para aparecer no fundo escuro
  },
  btnPrimary:{
    backgroundColor:'#007bff',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginTop: 20
  },
  btnText:{
    color:'white',
    fontWeight:'bold'
  },
  menuButton:{
    position:'absolute',
    top:50,
    left:20,
    backgroundColor:'rgba(255,255,255,0.3)',
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  menuText:{
    color:'white',
    fontSize:24,
    fontWeight:'bold'
  }
});