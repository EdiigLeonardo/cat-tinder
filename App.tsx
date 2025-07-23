import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
export default function App() {
  useEffect(() => {
    const response = fetch("https://api.thecatapi.com/v1/images/search");
    console.debug("[App][useEffect][responseFetch] ", {
      response: JSON.stringify(response),
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Foo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
