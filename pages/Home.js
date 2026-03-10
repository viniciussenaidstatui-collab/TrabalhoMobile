import React, { useState } from 'react';
import { StyleSheet, ScrollView, View as BaseView } from 'react-native';

import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import Container from '../componentes/Container';

export default function Home({ navigation }) {

  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <MyView style={styles.mainContainer}>

      {/* NAVBAR */}
      <BaseView style={styles.navbar}>
        <MyTouchableOpacity onPress={() => setMenuAberto(!menuAberto)}>
          <MyText style={styles.menuIcon}>☰</MyText>
        </MyTouchableOpacity>

        <MyText style={styles.navTitle}>SAMSUNG STORE</MyText>
      </BaseView>

      {/* MENU */}
      {menuAberto && (
        <BaseView style={styles.menuContainer}>

          <MyTouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setMenuAberto(false);
              navigation.navigate('Login');
            }}
          >
            <MyText style={styles.menuText}>Login</MyText>
          </MyTouchableOpacity>

          <MyTouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setMenuAberto(false);
              navigation.navigate('Cadastro');
            }}
          >
            <MyText style={styles.menuText}>Cadastro</MyText>
          </MyTouchableOpacity>

        </BaseView>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <MyText style={styles.sectionTitle}>Resumo</MyText>

        <BaseView style={styles.cardsRow}>
          <Container>
            <MyView style={styles.card}>
              <MyText style={styles.cardValue}>128</MyText>
              <MyText style={styles.cardLabel}>Vendas</MyText>
            </MyView>
          </Container>

          <Container>
            <MyView style={styles.card}>
              <MyText style={styles.cardValue}>R$ 45.200</MyText>
              <MyText style={styles.cardLabel}>Receita</MyText>
            </MyView>
          </Container>
        </BaseView>

        <Container>
          <MyView style={styles.card}>
            <MyText style={[styles.cardValue,{color:'#28a745'}]}>+15%</MyText>
            <MyText style={styles.cardLabel}>Crescimento Mensal</MyText>
          </MyView>
        </Container>

        <MyText style={styles.sectionTitle}>Ações rápidas</MyText>

        <BaseView style={styles.actionRow}>
          <MyTouchableOpacity style={styles.actionBtn}>
            <MyText style={styles.actionText}>📱 Produtos</MyText>
          </MyTouchableOpacity>

          <MyTouchableOpacity style={styles.actionBtn}>
            <MyText style={styles.actionText}>💰 Vendas</MyText>
          </MyTouchableOpacity>

          <MyTouchableOpacity style={styles.actionBtn}>
            <MyText style={styles.actionText}>📊 Relatórios</MyText>
          </MyTouchableOpacity>
        </BaseView>

        <MyText style={styles.sectionTitle}>Produto em destaque</MyText>

        <Container>
          <MyView style={styles.highlight}>
            <MyText style={styles.highlightTitle}>Galaxy S24 Ultra</MyText>
            <MyText style={styles.highlightPrice}>R$ 6.999</MyText>

            <MyTouchableOpacity style={styles.buyBtn}>
              <MyText style={styles.buyText}>VER PRODUTO</MyText>
            </MyTouchableOpacity>
          </MyView>
        </Container>

      </ScrollView>

    </MyView>
  );
}

const styles = StyleSheet.create({

  mainContainer:{
    flex:1,
    backgroundColor:'#f4f6fb'
  },

  /* NAVBAR */
  navbar:{
    height:70,
    backgroundColor:'#2c2c2c',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    gap:15
  },

  menuIcon:{
    color:'white',
    fontSize:26
  },

  navTitle:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },

  menuContainer:{
    backgroundColor:'#3a3a3a'
  },

  menuBtn:{
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:'#555'
  },

  menuText:{
    color:'white',
    fontSize:16
  },

  scrollContent:{
    padding:20,
    gap:15
  },

  sectionTitle:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:10,
    marginBottom:10,
    color:'#333'
  },

  cardsRow:{
    flexDirection:'row',
    gap:10
  },

  card:{
    alignItems:'center',
    padding:10
  },

  cardValue:{
    fontSize:22,
    fontWeight:'bold',
    color:'#6f42c1'
  },

  cardLabel:{
    fontSize:12,
    color:'#777',
    marginTop:4
  },

  actionRow:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  actionBtn:{
    backgroundColor:'#6f42c1',
    padding:14,
    borderRadius:10,
    flex:1,
    alignItems:'center',
    marginHorizontal:4
  },

  actionText:{
    color:'white',
    fontWeight:'bold',
    fontSize:12
  },

  highlight:{
    alignItems:'center',
    padding:15
  },

  highlightTitle:{
    fontSize:18,
    fontWeight:'bold'
  },

  highlightPrice:{
    fontSize:20,
    color:'#6f42c1',
    marginVertical:10,
    fontWeight:'bold'
  },

  buyBtn:{
    backgroundColor:'#007bff',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:8
  },

  buyText:{
    color:'white',
    fontWeight:'bold'
  }

});