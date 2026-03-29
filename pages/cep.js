import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  Alert 
} from 'react-native';
export default function BuscaCep({ navigation }) { 
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const handleBuscarCep = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          Alert.alert("Erro", "CEP não encontrado.");
          setEndereco(null);
        } else {
          setEndereco(data);
          Alert.alert("Sucesso", "Olha teu cep ae");
        }
      })
      .catch(error => {
        console.log('Erro na busca:', error);
        Alert.alert("Erro", "Não foi possível conectar ao serviço de CEP.");
      });
  };
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1557683311-eac922347aa1' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Buscar CEP</Text>

          <TextInput 
            style={styles.input}
            placeholder="Digite o CEP (Ex: 01001000)" 
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            maxLength={8}
            value={cep} 
            onChangeText={setCep} 
          />
          <TouchableOpacity 
            style={styles.btnSuccess}
            onPress={handleBuscarCep}
          >
            <Text style={styles.btnText}>PROCURAR</Text>
          </TouchableOpacity>
          {endereco && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.textoResultado}><Text style={styles.label}>Rua:</Text> {endereco.logradouro}</Text>
              <Text style={styles.textoResultado}><Text style={styles.label}>Bairro:</Text> {endereco.bairro}</Text>
              <Text style={styles.textoResultado}><Text style={styles.label}>Cidade:</Text> {endereco.localidade} - {endereco.uf}</Text>
              <Text style={styles.textoResultado}><Text style={styles.label}>Região:</Text> {endereco.regiao}</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { 
    flex: 1 
  },
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.6)' 
  },
  container: { 
    width: '90%', 
    padding: 20, 
    backgroundColor: '#fff', 
    borderRadius: 10 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: '#f2f2f2', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 15,
    fontSize: 16
  },
  btnSuccess: { 
    backgroundColor: '#28a745', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  textoResultado: { 
    color: '#555', 
    fontSize: 16, 
    marginBottom: 5 
  },
});