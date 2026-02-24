import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function ArtistScreen() {
  const navigation = useNavigation<any>();

  const [artists, setArtists] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    try {
      const res = await fetch(
        `https://saavn.sumit.co/api/search/artists?query=arijit&page=1`
      );
      const json = await res.json();
      setArtists(json.data?.results ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const next = page + 1;
      const res = await fetch(
        `https://saavn.sumit.co/api/search/artists?query=arijit&page=${next}`
      );
      const json = await res.json();

      setArtists(prev => [...prev, ...(json.data?.results ?? [])]);
      setPage(next);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  }

  const renderItem = ({ item }: any) => {
    const image =
      item.image?.[2]?.link ||
      item.image?.[2]?.url ||
      item.image?.[0]?.link ||
      item.image?.[0]?.url ||
      "https://via.placeholder.com/300";

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("ArtistDetail", { artist: item })}
      >
        <Image source={{ uri: image }} style={styles.image} />

        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#FF7A00" style={{ margin: 20 }} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  card: {
    width: "48%",
    marginBottom: 18,
    alignItems: "center",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 100,   // round artist face
    backgroundColor: "#FFF4E6",
  },

  title: {
    marginTop: 8,
    fontWeight: "700",
    color: "#111",
    fontSize: 15,
    textAlign: "center",
  },
});