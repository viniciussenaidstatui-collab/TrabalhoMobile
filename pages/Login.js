import useState from 'react';

import React from 'react';
import {Image, Text, Alert} from "react-native"
import { StyleSheet, View as BaseView } from 'react-native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

  

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
          
          <MyTextInput placeholder={"E-mail"} value={user} onChangeText= {setUser} keyboardType="email-address"/>
          <MyTextInput placeholder={"Senha"} value={user} onChangeText= {setPass} secureTextEntry/>
          

          <MyTouchableOpacity style={styles.btnPrimary}>
            <MyText style={styles.btnText} btnText={"LOGIN"} onPress={logar} >ENTRAR</MyText>
          </MyTouchableOpacity>

        </Container>

      </BaseView>
    </MyImageBackground>
  );



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
    marginBottom:20
  },

  btnPrimary:{
    backgroundColor:'#007bff',
    padding:15,
    borderRadius:10,
    alignItems:'center'
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