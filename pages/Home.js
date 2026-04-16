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
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para deslogar
  async function deslogar() {
    setLoading(true);
    try {
      // Remove o token do AsyncStorage
      await AsyncStorage.removeItem('token');
      console.log('✅ Token removido com sucesso');
      
      Alert.alert(
        'Logout',
        'Você saiu do sistema com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navega para a tela de login e remove o histórico
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao remover token:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout');
    } finally {
      setLoading(false);
      setMenuAberto(false);
    }
  }

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* NAVBAR */}
        <View style={styles.navbar}>
          <TouchableOpacity 
            onPress={() => setMenuAberto(!menuAberto)}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>SAMSUNG STORE</Text>
          <View style={styles.navRight} />
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

            {/* Botão de Logout */}
            <TouchableOpacity
              style={[styles.menuBtn, styles.logoutBtn]}
              onPress={deslogar}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ff4444" size="small" />
              ) : (
                <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* CONTEÚDO ORIGINAL */}
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
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  safeArea: {
    flex: 1,
  },
  navbar: {
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  navRight: {
    width: 40,
  },
  menuContainer: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuBtn: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  logoutBtn: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.2)',
    marginTop: 5,
  },
  logoutText: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ecdc4',
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 'bold',
    fontSize: 11,
  },
  highlightCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  highlightPrice: {
    fontSize: 22,
    color: '#4ecdc4',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  buyBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});