import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "scaling";

type Cat = {
  id: string;
  url: string;
  name?: string;
  origin?: string;
  age?: number;
};

type Props = {
  cat: Cat;
  onLike: () => void;
  onDislike: () => void;
  isFavorite?: boolean;
  disableActions?: boolean;
};

const CatProfileCard: React.FC<Props> = ({
  cat,
  onLike,
  onDislike,
  isFavorite = false,
  disableActions = false,
}) => {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.cardInside}>
        <Image source={{ uri: cat.url }} style={styles.image} />
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.name}>{cat.name}</Text>
            <Text style={styles.age}>{cat.age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.details}>{cat.origin}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={onDislike} style={styles.actionBtn}>
          <Ionicons name="close" size={28} color="#f55" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.debug("[CATPROFILECARD] Liked cat:", cat.name);
            onLike();
          }}
          style={styles.actionBtn}
        >
          <Ionicons name="heart" size={28} color="#4caf50" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: scale(16),
    marginTop: scale(8),
    borderRadius: scale(20),
    overflow: "hidden",
    alignItems: "center",
    maxHeight: scale(500),
  },
  cardInside: {
    width: scale(300),
    backgroundColor: "#fff",
    borderRadius: scale(20),
    overflow: "hidden",
    alignItems: "center",
    elevation: scale(5),
    height: scale(320),
  },
  image: {
    width: "100%",
    height: "100%",
    marginBottom: scale(30),
  },
  infoBox: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
    width: "100%",
    height: "30%",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    padding: scale(16),
    elevation: scale(5),
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: scale(10),
    flexDirection: "row",
    width: "100%",
    marginBottom: scale(10),
  },
  name: {
    fontSize: scale(22),
    fontWeight: "bold",
  },
  details: {
    fontSize: scale(16),
    color: "gray",
  },
  age: {
    fontSize: scale(16),
    color: "black",
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    width: "100%",
  },
  actionBtn: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 50,
    elevation: 3,
  },
});

export default CatProfileCard;
