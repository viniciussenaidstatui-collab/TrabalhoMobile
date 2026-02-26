import React, { useState } from 'react'; // Adicionado useState
import { StyleSheet, ScrollView, View as BaseView } from 'react-native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import Container from '../componentes/Container';

// Importando as outras telas diretamente
import Login from './Login';
import Cadastro from './Cadastro';

export default function Home() {
  // Estado para controlar qual tela exibir
  const [telaAtual, setTelaAtual] = useState('home');

  // Lógica de troca de tela simples
  // Dentro da função Home(), onde você faz as verificações de tela:

if (telaAtual === 'login') {
  return <Login onBack={() => setTelaAtual('home')} />;
}

if (telaAtual === 'cadastro') {
  return <Cadastro onBack={() => setTelaAtual('home')} />;
}

  

  return (
    <MyView style={styles.mainContainer}>
      {/* Navbar */}
      <MyView style={styles.navbar}>
        <MyText style={styles.logoText}>SAMSUNG/STORE</MyText>
        
        <BaseView style={styles.navButtons}>
          <MyTouchableOpacity 
            style={styles.navIconBtn} 
            onPress={() => setTelaAtual('login')} // Agora muda o estado
          >
            <MyText style={styles.navBtnText}>LOGIN</MyText>
          </MyTouchableOpacity>

          <MyTouchableOpacity 
            style={[styles.navIconBtn, styles.registerBtn]} 
            onPress={() => setTelaAtual('cadastro')} // Agora muda o estado
          >
            <MyText style={styles.navBtnText}>CADASTRO</MyText>
          </MyTouchableOpacity>
        </BaseView>
      </MyView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MyView style={styles.contentSection}>
          <MyText style={styles.sectionTitle}>Resumo de Vendas</MyText>
          
          <Container>
            <MyView style={styles.statsRow}>
              <MyView style={styles.statBox}>
                <MyText style={styles.statValue}>128</MyText>
                <MyText style={styles.statLabel}>Vendas</MyText>
              </MyView>
              
              <MyView style={styles.divider} />

              <MyView style={styles.statBox}>
                <MyText style={styles.statValue}>R$ 45.200</MyText>
                <MyText style={styles.statLabel}>Receita</MyText>
              </MyView>
            </MyView>
          </Container>

          <MyView style={{ marginTop: 20 }}>
            <Container>
               <MyView style={styles.statBox}>
                <MyText style={[styles.statValue, { color: '#28a745' }]}>+ 15%</MyText>
                <MyText style={styles.statLabel}>Crescimento Mensal</MyText>
              </MyView>
            </Container>
          </MyView>

        </MyView>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f8f7ff' },
  navbar: {
    height: 110,
    backgroundColor: '#6f42c1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 45,
    elevation: 4,
  },
  logoText: { color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  navButtons: { flexDirection: 'row', gap: 8 },
  navIconBtn: { 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  registerBtn: { backgroundColor: '#28a745', borderColor: '#218838' },
  navBtnText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  scrollContent: { paddingBottom: 30, alignItems: 'center' },
  contentSection: { width: '100%', paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'left' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statBox: { alignItems: 'center', flex: 1 },
  divider: { width: 1, height: 40, backgroundColor: '#eee' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#6f42c1' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4, textTransform: 'uppercase' },
});