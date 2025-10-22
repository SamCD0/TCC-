import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFonts,
  LeagueSpartan_400Regular,
  LeagueSpartan_700Bold,
} from "@expo-google-fonts/league-spartan";
import AppLoading from "expo-app-loading";

// Telas
import TelaCarregamento from "./telas/TelaCarregamento";
import TelaLogin from "./telas/TelaLogin";
import TelaComunidade from "./telas/TelaComunidade";
import TelaNoticias from "./telas/TelaNoticias";
import TelaCadastro from "./telas/TelaCadastro";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "LeagueSpartan_700Bold",
          fontSize: 33,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Comunidade") iconName = "forum";
          else if (route.name === "Notícias") iconName = "newspaper";
          else if (route.name === "Login") iconName = "login";
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Comunidade" component={TelaComunidade} />
      <Tab.Screen name="Notícias" component={TelaNoticias} />
      <Tab.Screen name="Login" component={TelaLogin} />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    LeagueSpartan_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Carregamento" component={TelaCarregamento} />
        <Stack.Screen name="Principal" component={TabNavigator} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
