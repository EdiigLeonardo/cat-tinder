import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CatProfileCard from "components/CatProfileCard";
import { scale } from "scaling";
import { useNavigation } from "@react-navigation/native";

type Cat = {
  id: string;
  url: string;
  name?: string;
  origin?: string;
  age?: number;
};

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<Cat[]>([]);

  // Na implementação real, você buscaria os favoritos de um contexto ou estado global
  // Aqui estou simulando com um estado local apenas para demonstração

  const navigateToHome = useCallback(() => {
    navigation.navigate("Cats");
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfbfd" }}>
      <View style={styles.headerContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={navigateToHome}
            style={styles.toggleButtonInactive}
          >
            <Ionicons
              name="flame"
              size={scale(25)}
              style={styles.toggleIcon}
              color="#ccc"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButtonActive}>
            <Ionicons
              name="star"
              size={scale(25)}
              style={styles.toggleIcon}
              color="#FF5E5E"
            />
          </TouchableOpacity>
        </View>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum gato favoritado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <CatProfileCard
                cat={item}
                onLike={() => {}}
                onDislike={() => {}}
                disableActions={true}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    height: scale(60),
    marginBottom: scale(30),
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(100),
    elevation: scale(5),
    backgroundColor: "#E3E3E4",
    width: scale(200),
    height: "100%",
    gap: scale(5),
    overflow: "hidden",
    marginBottom: scale(16),
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
  },
  toggleButtonActive: {
    backgroundColor: "#fff",
    elevation: scale(5),
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(100),
  },
  toggleButtonInactive: {
    backgroundColor: "transparent",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(100),
  },
  toggleIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: scale(18),
    color: "gray",
  },
  listContainer: {
    padding: scale(16),
  },
  cardContainer: {
    marginBottom: scale(16),
  },
});

export default FavoritesScreen;
