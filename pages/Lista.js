import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

export default function Lista() {
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function Buscar() {
      try {
        setLoading(true);
        const response = await axios.post('http://10.0.2.2:8000/api/todos_samsung');
        const timesData = response.data.samsung || [];
        setDados(timesData);
      } catch (error) {
        console.log('Erro:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar');
      } finally {
        setLoading(false);
      }
    }
    Buscar();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => { setRecebeDado(item); setModal(true); }}
      style={styles.card}
    >
      <Text style={styles.cardTitulo}>{item.aparelho}</Text>
      <Text style={styles.cardInfo}>{item.modelo} | {item.cor}</Text>
      <Text style={styles.cardAno}>📅 {item.ano}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* NAVBAR */}
        <View style={styles.navbar}>
          <Text style={styles.navTitle}>Produtos Cadastrados</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <FlatList
          data={dados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        />

        {/* MODAL DE DETALHES */}
        <Modal visible={modal} transparent={false} animationType="slide">
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
            style={styles.background}
          >
            <View style={styles.overlay}>
              <View style={styles.navbar}>
                <Text style={styles.navTitle}>Detalhes do Produto</Text>
              </View>

              <ScrollView contentContainerStyle={styles.modalScroll}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalLabel}>Aparelho</Text>
                  <Text style={styles.modalValue}>{recebeDado.aparelho}</Text>

                  <Text style={styles.modalLabel}>Modelo</Text>
                  <Text style={styles.modalValue}>{recebeDado.modelo}</Text>

                  <Text style={styles.modalLabel}>Cor</Text>
                  <Text style={styles.modalValue}>{recebeDado.cor}</Text>

                  <Text style={styles.modalLabel}>Ano</Text>
                  <Text style={styles.modalValue}>{recebeDado.ano}</Text>

                  <TouchableOpacity style={styles.btnPrimary} onPress={() => setModal(false)}>
                    <Text style={styles.btnText}>FECHAR</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnWarning}
                    onPress={() => { setModal(false); navigation.navigate('Edita', { produto: recebeDado }); }}
                  >
                    <Text style={styles.btnText}>ALTERAR</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnDanger}
                    onPress={() => { setModal(false); navigation.navigate('Deletar', { produto: recebeDado }); }}
                  >
                    <Text style={styles.btnText}>EXCLUIR</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </Modal>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  navTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  loadingText: { color: 'white', marginTop: 12, fontSize: 16 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 6 },
  cardInfo: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 4 },
  cardAno: { color: 'rgba(255,255,255,0.9)', fontSize: 15, fontWeight: '600' },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
  },
  modalLabel: { color: '#ccc', fontSize: 13, marginTop: 12 },
  modalValue: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  btnPrimary: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnWarning: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnDanger: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  backBtn: { marginVertical: 10, marginHorizontal: 20 },
  backText: { color: '#ccc', fontSize: 14 },
});