import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [loading, setLoading] = useState(false);

  async function deslogar() {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout', 'Você saiu do sistema com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer logout');
    } finally {
      setLoading(false);
      setMenuAberto(false);
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <SafeAreaView style={{ flex: 1, width: '100%' }}>

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
              <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Login'); }}>
                <Text style={styles.menuText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Cadastro'); }}>
                <Text style={styles.menuText}>Cadastro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('cep'); }}>
                <Text style={styles.menuText}>CEP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Lista'); }}>
                <Text style={styles.menuText}>Lista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { setMenuAberto(false); navigation.navigate('Cdit'); }}>
                <Text style={styles.menuText}>Cadastrar Produto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuBtn, styles.logoutBtn]} onPress={deslogar} disabled={loading}>
                {loading
                  ? <ActivityIndicator color="#fff" size="small" />
                  : <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
                }
              </TouchableOpacity>
            </View>
          )}

          {/* CONTEÚDO */}
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Resumo</Text>

            <View style={styles.cardsRow}>
              <View style={styles.card}>
                <Text style={styles.cardValue}>128</Text>
                <Text style={styles.cardLabel}>Vendas</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardValue}>R$ 45.200</Text>
                <Text style={styles.cardLabel}>Receita</Text>
              </View>
            </View>

            <View style={[styles.card, { width: '100%', marginBottom: 10 }]}>
              <Text style={[styles.cardValue, { color: '#4ecdc4' }]}>+15%</Text>
              <Text style={styles.cardLabel}>Crescimento Mensal</Text>
            </View>

            <Text style={styles.sectionTitle}>Ações rápidas</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>Produtos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>Vendas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>Relatórios</Text>
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

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  navbar: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  menuIcon: { color: 'white', fontSize: 28, marginRight: 15 },
  navTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  menuContainer: { backgroundColor: 'rgba(0,0,0,0.75)' },
  menuBtn: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  menuText: { color: 'white', fontSize: 16 },
  logoutBtn: { borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.2)', marginTop: 5 },
  logoutText: { color: '#ff6b6b', fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 15,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardValue: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  cardLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionText: { color: 'white', fontWeight: 'bold', fontSize: 11 },
  highlightCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  highlightTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  highlightPrice: { fontSize: 22, color: '#4ecdc4', marginVertical: 10, fontWeight: 'bold' },
  buyBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buyText: { color: 'white', fontWeight: 'bold' },
});