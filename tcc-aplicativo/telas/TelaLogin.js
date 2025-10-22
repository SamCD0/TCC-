import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

// Necessário para expo-auth-session no ambiente web e standalone
WebBrowser.maybeCompleteAuthSession();

// SUBSTITUA estes IDs pelos seus!
const GOOGLE_CLIENT_ID_ANDROID = "SEU_CLIENT_ID_ANDROID.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID_IOS = "SEU_CLIENT_ID_IOS.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID_WEB = "SEU_CLIENT_ID_WEB.apps.googleusercontent.com";

export default function TelaLoginUsuario({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  // 1. Configuração do Hook do Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_CLIENT_ID_ANDROID,
    iosClientId: GOOGLE_CLIENT_ID_IOS,
    webClientId: GOOGLE_CLIENT_ID_WEB,
  });

  // 2. Efeito para lidar com a resposta do Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    } else if (response?.type === 'error') {
      Alert.alert("Erro de Login", "Não foi possível completar o login com Google.");
    }
  }, [response]);

  // 3. Função para buscar os dados do usuário do Google
  const fetchUserInfo = async (token) => {
    try {
      const userResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userResponse.json();
      setUserInfo(user);
      
      Alert.alert("Sucesso Google", `Login efetuado, ${user.name}!`);
      // **AÇÃO REAL:** navigation.navigate("Principal");

    } catch (error) {
      console.error("Erro ao buscar dados do Google:", error);
      Alert.alert("Erro", "Falha ao obter dados do usuário do Google.");
    }
  };


  // 4. Login Local (Usuário Normal)
  const fazerLoginLocal = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    
    // **INTEGRAÇÃO REAL AQUI:**
    // Aqui você chamaria sua API/Backend para autenticar
    // Exemplo: axios.post('/api/login', { email, senha }).then(response => { ... })

    // Placeholder de Sucesso (Para fins de demonstração)
    Alert.alert("Sucesso", "Login Local efetuado! (Integrar com Backend)");
    // navigation.navigate("Principal");
  };

  return (
    <LinearGradient
      // Mantendo o gradiente roxo/azul que você gostou
      colors={["#AC327F", "#09004C", "#050026", "#0A0099"]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.box}>
        <Text style={styles.titulo}>Entrar</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
        {/* Botão de Login Local */}
        <TouchableOpacity style={styles.botaoLocal} onPress={fazerLoginLocal}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.divisor}>OU</Text>

        {/* Botão de Login com Google */}
        <TouchableOpacity 
          style={styles.botaoGoogle} 
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}>
          <Text style={styles.botaoTextoGoogle}>
            Entrar com Google
          </Text>
        </TouchableOpacity>
        
        {userInfo && <Text style={styles.userInfo}>Logado como: {userInfo.email}</Text>}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  box: { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 15, padding: 20 },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "#0BB5AE",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  // Estilo do Botão Local (Padrão)
  botaoLocal: {
    backgroundColor: "#140099",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  
  // Estilo do Botão Google
  botaoGoogle: {
    backgroundColor: "#DB4437", // Cor do Google
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  botaoTextoGoogle: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  divisor: {
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
  },
  userInfo: {
    color: '#0BB5AE',
    textAlign: 'center',
    marginTop: 10,
  }
});