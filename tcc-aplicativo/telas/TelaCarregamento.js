import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TelaCarregamento({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace("Principal");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#AC327F", "#09004C", "#050026", "#0A0099"]} // NOVO GRADIENTE
      start={{ x: 0.1, y: 0 }} // NOVO START
      end={{ x: 1, y: 1 }} // NOVO END
      style={styles.container}
    >
      <Animated.Text style={[styles.titulo, { opacity: fadeAnim }]}>
        Pulse X
      </Animated.Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { color: "#fff", fontSize: 32, fontWeight: "bold" },
});