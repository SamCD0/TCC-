import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TelaNoticias() {
  const noticias = [
    { id: "1", titulo: "Versão 2.0 lançada 🚀", conteudo: "Novo sistema de otimização reduz uso de memória em 30%." },
    { id: "2", titulo: "Compatibilidade expandida 💻", conteudo: "Agora o software funciona oficialmente no Windows 11." },
    { id: "3", titulo: "Atualização de segurança 🔒", conteudo: "Proteção extra contra processos indesejados adicionada." },
  ];

  return (
    <LinearGradient
      colors={["#AC327F", "#09004C", "#050026", "#0A0099"]} // NOVO GRADIENTE
      start={{ x: 0.1, y: 0 }} // NOVO START
      end={{ x: 1, y: 1 }} // NOVO END
      style={styles.container}
    >
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.conteudo}>{item.conteudo}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: {
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo do Card ajustado para seguir o padrão
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  titulo: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  conteudo: { color: "#fff" },
});