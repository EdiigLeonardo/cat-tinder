import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Perfil do Usuário</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, color: "#666" },
});

export default ProfileScreen;
