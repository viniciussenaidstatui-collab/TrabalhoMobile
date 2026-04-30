import { useState, useEffect } from "react";
import axios from "axios"; // ✅ ADICIONADO
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Pressable, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Lista() {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function Buscar() {
      try {
        setLoading(true);

        const response = await axios.post("http://10.0.2.2:8000/api/todos_samsung");

        const timesData = response.data.samsung || [];
        setDados(timesData);

      } catch (error) {
        console.log("Erro:", error.response?.data || error.message);
        Alert.alert("Erro", "Não foi possível carregar");
      } finally {
        setLoading(false);
      }
    }
    Buscar();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setRecebeDado(item);
        setModal(true);
      }}
      style={styles.timeCard}
    >
      <Text style={styles.nomeTime}>{item.aparelho}</Text> 
      <Text style={styles.infoText}>📅 {item.modelo} | 📍 {item.cor}</Text>
      <Text style={styles.titulosText}>🏆 {item.ano} título(s)</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navbar}>
          <Text style={styles.navTitle}>SAMSUNG STORE</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.sectionTitle}>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>

      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Produtos Cadastrados</Text>
      </View>

      <FlatList
        data={dados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // ✅ CORRIGIDO
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modal} transparent={false} animationType="slide">
        <View style={styles.mainContainer}>
          <View style={styles.navbar}>
            <Text style={styles.navTitle}>DETALHES DO PRODUTO</Text>
          </View>

          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={styles.highlightCard}>

              <View style={styles.detailItem}>
                <Text style={styles.label}>Aparelho:</Text>
                <Text style={styles.value}>{recebeDado.aparelho}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.label}>Modelo:</Text>
                <Text style={styles.value}>{recebeDado.modelo}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.label}>Cor:</Text>
                <Text style={styles.value}>{recebeDado.cor}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.label}>Ano:</Text>
                <Text style={styles.value}>{recebeDado.ano}</Text>
              </View>

              <TouchableOpacity
                style={styles.buyBtn}
                onPress={() => setModal(false)}
              >
                <Text style={styles.buyText}>FECHAR</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f4f6fb' },
  navbar: { height: 80, backgroundColor: '#2c2c2c', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  navTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  timeCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  nomeTime: { fontSize: 20, fontWeight: 'bold', color: '#6f42c1', marginBottom: 8 },
  infoText: { color: '#555', fontSize: 14, marginBottom: 4 },
  titulosText: { color: '#333', fontSize: 16, fontWeight: '700' },
  highlightCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 3 },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  label: { color: '#6f42c1', fontSize: 16, fontWeight: '700' },
  value: { color: '#333', fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'right' },
  buyBtn: { backgroundColor: '#007bff', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, alignItems: 'center', marginTop: 20 },
  buyText: { color: 'white', fontWeight: 'bold' },
});