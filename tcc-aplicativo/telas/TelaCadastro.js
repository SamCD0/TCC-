import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TelaCadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    Alert.alert("Sucesso", "Conta criada com sucesso!");
    navigation.replace("Principal");
  };

  return (
    <LinearGradient
      colors={["#AC327F", "#09004C", "#050026", "#0A0099"]} // NOVO GRADIENTE
      start={{ x: 0.1, y: 0 }} // NOVO START
      end={{ x: 1, y: 1 }} // NOVO END
      style={styles.container}
    >
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc" // Ajuste
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc" // Ajuste
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 40, color: "white" },
  input: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)", // Ajuste
    color: "#0BB5AE", // Ajuste para a cor padrão de input
    borderRadius: 10, // Ajuste
    padding: 15, // Ajuste
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#140099",
    paddingVertical: 15, // Ajuste
    paddingHorizontal: 30,
    borderRadius: 10, // Ajuste
    marginTop: 10,
  },
  botaoTexto: { color: "white", fontWeight: "bold", fontSize: 16 },
});