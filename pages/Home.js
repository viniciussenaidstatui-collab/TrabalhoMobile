
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default function Home({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <View style={styles.mainContainer}>

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
              navigation.navigate('cep');
            }}
          >
            <Text style={styles.menuText}>Cep</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        <Text style={styles.sectionTitle}>Resumo</Text>

        <View style={styles.cardsRow}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardValue}>128</Text>
            <Text style={styles.cardLabel}>Vendas</Text>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.cardValue}>R$ 45.200</Text>
            <Text style={styles.cardLabel}>Receita</Text>
          </View>
        </View>

        <View style={[styles.cardContainer, { width: '100%' }]}>
          <Text style={[styles.cardValue, { color: '#28a745' }]}>+15%</Text>
          <Text style={styles.cardLabel}>Crescimento Mensal</Text>
        </View>

        <Text style={styles.sectionTitle}>Ações rápidas</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>📱 Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>💰 Vendas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>📊 Relatórios</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Produto em destaque</Text>

        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Galaxy S24 Ultra</Text>
          <Text style={styles.highlightPrice}>R$ 6.999</Text>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>VER PRODUTO</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
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
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6f42c1',
  },
  cardLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    backgroundColor: '#6f42c1',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  highlightCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlightPrice: {
    fontSize: 22,
    color: '#6f42c1',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  buyBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});