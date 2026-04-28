import { useState, useEffect } from "react";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Pressable, Modal, TouchableOpacity } from "react-native";


export default function Lista() {
    const [modal, setModal] = useState(false);
    const [Dados, setDados] = useState([]);
    const [recebeDado, setRecebeDado] = useState("");

    useEffect(() => {

        async function Buscar() {
            try {

                const response = await axios.get("https://68e447c28e116898997b7339.mockapi.io/teste/user")
                console.log(response.data);
                setDados(response.data);
            } catch (error) {
                console.log("ERRO", error.response.data.errors)
            }

        }

        Buscar();

    }, [])

    const renderItem = ({ item }) => (
        <Pressable onPress={() => { setRecebeDado(item); setModal(!modal) }}>
            <View style={{ width: "100%", height: 100, backgroundColor: "#808080", borderWidth: 2, borderColor: "#000" }}>
                <Text>{item.nome}</Text>
                <Text>{item.email}</Text>
            </View>
        </Pressable>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={Dados}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Modal
                visible={modal}
                transparent={false}
                animationType="slide"
                onRequestClose={() => setModal(!modal)}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>{recebeDado.nome}</Text>
                    <Text>{recebeDado.email}</Text>
                    <TouchableOpacity
                        style={{ width: "50%", height: 30, backgroundColor: "#da1e1e", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#000" }}
                        onPress={() => setModal(!modal)}
                    >
                        <Text>Fechar Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}