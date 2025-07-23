import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CatProfileCard from "components/CatProfileCard";
import { scale } from "scaling";

type Cat = {
  id: string;
  url: string;
  name?: string;
  origin?: string;
  age?: number;
};

const CatsScreen: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Cat[]>([]);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      const data = await response.json();

      const fakeCatNames = [
        { name: "Abyssinian", origin: "Egypt" },
        { name: "Maine Coon", origin: "USA" },
        { name: "Siamese", origin: "Thailand" },
        { name: "Persian", origin: "Iran" },
        { name: "Sphynx", origin: "Canada" },
      ];

      const enrichedData: Cat[] = data.map((cat: any, index: number) => ({
        id: cat.id,
        url: cat.url,
        ...fakeCatNames[index % fakeCatNames.length],
        age: 1 + Math.floor(Math.random() * 15),
      }));

      setCats(enrichedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleLike = () => {
    if (!showFavorites) setFavorites([...favorites, cats[currentIndex]]);
    setCurrentIndex((prev) => Math.min(prev + 1, cats.length - 1));
  };

  const handleDislike = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, cats.length - 1));
  };

  const displayedList = showFavorites ? favorites : cats;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfbfd" }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          height: scale(60),
          marginBottom: scale(30),
        }}
      >
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setShowFavorites(false)}
            style={[
              styles.toggleButton,
              !showFavorites
                ? styles.toggleButtonActive
                : styles.toggleButtonInactive,
            ]}
          >
            <Ionicons
              name="flame"
              size={scale(25)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              color={!showFavorites ? "#FF5E5E" : "#ccc"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFavorites(true)}
            style={[
              styles.toggleButton,
              showFavorites
                ? styles.toggleButtonActive
                : styles.toggleButtonInactive,
            ]}
          >
            <Ionicons
              name="star"
              size={scale(25)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              color={showFavorites ? "#FF5E5E" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>
      ) : displayedList.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum gato encontrado.</Text>
        </View>
      ) : (
        <CatProfileCard
          cat={displayedList[currentIndex]}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    display: "flex",
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
    position: "relative",
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
  },
  toggleButton: {
    flex: 1,
    height: "100%",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: scale(100),
  },
  toggleButtonActive: {
    backgroundColor: "#fff",
    elevation: scale(5),
  },
  toggleButtonInactive: {
    backgroundColor: "transparent",
  },

  loading: {
    flex: scale(1),
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    flex: scale(1),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: scale(18),
    color: "gray",
  },
});

export default CatsScreen;
