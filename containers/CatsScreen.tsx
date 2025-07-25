import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import CatProfileCard from "components/CatProfileCard";
import { scale } from "scaling";

type Cat = {
  id: string;
  url: string;
  name?: string;
  origin?: string;
  age?: number;
};

// Limite de cards para carregar antes de fazer nova requisição
const INITIAL_LOAD_COUNT = 30;
const LOAD_MORE_THRESHOLD = 5;

const CatsScreen: React.FC = () => {
  const [allCats, setAllCats] = useState<Cat[]>([]);
  const [displayedCats, setDisplayedCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Cat[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const swiperRef = useRef<Swiper<Cat>>(null);

  // Função para enriquecer os dados dos gatos
  const enrichCatData = useCallback((data: any[]) => {
    const fakeCatNames = [
      { name: "Abyssinian", origin: "Egypt" },
      { name: "Maine Coon", origin: "USA" },
      { name: "Siamese", origin: "Thailand" },
      { name: "Persian", origin: "Iran" },
      { name: "Sphynx", origin: "Canada" },
    ];

    return data.map((cat, index) => ({
      id: cat.id,
      url: cat.url,
      ...fakeCatNames[index % fakeCatNames.length],
      age: 18 + Math.floor(Math.random() * 15),
    }));
  }, []);

  const fetchCats = useCallback(
    async (count: number = INITIAL_LOAD_COUNT) => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${count}`
        );
        const data = await response.json();
        const enrichedData = enrichCatData(data);
        setAllCats((prev) => [...prev, ...enrichedData]);
        setDisplayedCats((prev) => [...prev, ...enrichedData]);
      } catch (err) {
        console.error("[CATSCREEN] Error fetching cats:", err);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [enrichCatData]
  );

  // Carrega mais gatos quando estiver perto do fim
  const checkLoadMore = useCallback(
    (index: number) => {
      const remainingCards = allCats.length - index;
      if (remainingCards <= LOAD_MORE_THRESHOLD && !isFetchingMore) {
        setIsFetchingMore(true);
        fetchCats(INITIAL_LOAD_COUNT);
      }
    },
    [allCats.length, isFetchingMore, fetchCats]
  );

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const handleSwipedLeft = useCallback(
    (index: number) => {
      console.log("[CATSCREEN] Disliked:", allCats[index]);
      checkLoadMore(index);
    },
    [allCats, checkLoadMore]
  );

  const handleSwipedRight = useCallback(
    (index: number) => {
      if (!showFavorites) {
        setFavorites((prev) => [...prev, allCats[index]]);
      }
      console.log("[CATSCREEN] Liked:", allCats[index]);
      checkLoadMore(index);
    },
    [allCats, showFavorites, checkLoadMore]
  );

  const handleLike = useCallback(() => {
    swiperRef.current?.swipeRight();
  }, []);

  const handleDislike = useCallback(() => {
    swiperRef.current?.swipeLeft();
  }, []);

  const toggleFavorites = useCallback((show: boolean) => {
    console.log("[CATSCREEN] Toggling favorites:", show);
    setShowFavorites(show);
    if (swiperRef.current) {
      swiperRef.current.setState({ firstCardIndex: 0 });
    }
  }, []);

  const currentList = showFavorites ? favorites : displayedCats;

  const renderCard = useCallback(
    (cat: Cat) => {
      console.debug("[CATSCREEN] Rendering card:", cat);
      if (!cat) return null;
      return (
        <CatProfileCard
          cat={cat}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      );
    },
    [handleLike, handleDislike]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfbfd" }}>
      <View style={styles.headerContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => toggleFavorites(false)}
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
              style={styles.toggleIcon}
              color={!showFavorites ? "#FF5E5E" : "#ccc"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleFavorites(true)}
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
              style={styles.toggleIcon}
              color={showFavorites ? "#FF5E5E" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {loading && allCats.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>
      ) : currentList.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {showFavorites
              ? "Nenhum gato favoritado ainda."
              : "Nenhum gato encontrado."}
          </Text>
        </View>
      ) : (
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={currentList}
            renderCard={renderCard}
            onSwipedLeft={handleSwipedLeft}
            onSwipedRight={handleSwipedRight}
            infinite={false} // Desativado para melhor controle
            backgroundColor="transparent"
            cardHorizontalMargin={0}
            cardVerticalMargin={0}
            stackSize={3}
            stackSeparation={15}
            disableTopSwipe
            disableBottomSwipe
            animateCardOpacity
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
                    borderWidth: 1,
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: "LIKE",
                style: {
                  label: {
                    backgroundColor: "green",
                    borderColor: "green",
                    color: "white",
                    borderWidth: 1,
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
            onSwipedAll={() => {
              if (!showFavorites && !isFetchingMore) {
                fetchCats();
              }
            }}
          />
          {isFetchingMore && (
            <View style={styles.loadingMore}>
              <ActivityIndicator size="small" />
            </View>
          )}
        </View>
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
  swiperContainer: {
    flex: 1,
    position: "relative",
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
  toggleButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(100),
  },
  toggleButtonActive: {
    backgroundColor: "#fff",
    elevation: scale(5),
  },
  toggleButtonInactive: {
    backgroundColor: "transparent",
  },
  toggleIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  loading: {
    flex: scale(1),
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMore: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
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
