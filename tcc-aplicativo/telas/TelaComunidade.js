import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TelaComunidade() {
  const [posts, setPosts] = useState([
    { id: "1", autor: "João", conteudo: "Esse software aumentou muito o FPS do meu PC 🎮" },
    { id: "2", autor: "Maria", conteudo: "Alguém sabe se funciona no Windows 11?" },
    { id: "3", autor: "Lucas", conteudo: "Rodando liso até em máquina fraca 🔥" },
  ]);

  const [novoPost, setNovoPost] = useState("");

  const adicionarPost = () => {
    if (novoPost.trim() === "") return;
    const post = { id: String(Date.now()), autor: "Você", conteudo: novoPost };
    setPosts([post, ...posts]);
    setNovoPost("");
  };

  const apagarPost = (id) => {
    const filtrados = posts.filter((post) => post.id !== id);
    setPosts(filtrados);
  };

  return (
    <LinearGradient
      colors={["#AC327F", "#09004C", "#050026", "#0A0099"]} // NOVO GRADIENTE
      start={{ x: 0.1, y: 0 }} // NOVO START
      end={{ x: 1, y: 1 }} // NOVO END
      style={styles.container}
    >
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Escreva um post..."
          placeholderTextColor="#ccc"
          value={novoPost}
          onChangeText={setNovoPost}
        />
        <TouchableOpacity style={styles.botao} onPress={adicionarPost}>
          <Text style={styles.botaoTexto}>Postar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.autor}>{item.autor}</Text>
              {item.autor === "Você" && (
                <TouchableOpacity onPress={() => apagarPost(item.id)}>
                  <Text style={styles.apagar}>❌</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.conteudo}>{item.conteudo}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  inputArea: { flexDirection: "row", marginBottom: 10 },
  input: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Ajuste
    color: "#0BB5AE", // Ajuste para a cor padrão de input
    borderRadius: 10, // Ajuste
    padding: 15, // Ajuste
    marginRight: 8,
  },
  botao: {
    backgroundColor: "#140099", // Padrão
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10, // Ajuste
  },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo do Card ajustado para seguir o padrão da 'box' de Login
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  autor: { color: "white", fontWeight: "bold", marginBottom: 5 },
  conteudo: { color: "#fff" },
  apagar: { color: "#FF4C4C", fontWeight: "bold", fontSize: 18 },
});