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

export default function AlbumScreen() {
  const navigation = useNavigation<any>();

  const [albums, setAlbums] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadInitial();
  }, []);

  /* ---------- INITIAL LOAD ---------- */
  async function loadInitial() {
    try {
      const res = await fetch(
        `https://saavn.sumit.co/api/search/albums?query=arijit&page=1`
      );
      const json = await res.json();
      setAlbums(json.data?.results ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- LOAD MORE (INFINITE SCROLL) ---------- */
  async function loadMore() {
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const nextPage = page + 1;

      const res = await fetch(
        `https://saavn.sumit.co/api/search/albums?query=arijit&page=${nextPage}`
      );

      const json = await res.json();

      setAlbums(prev => [...prev, ...(json.data?.results ?? [])]);
      setPage(nextPage);

    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  }

  /* ---------- RENDER ITEM ---------- */
  const renderItem = ({ item }: any) => {

    const image =
      item.image?.[2]?.link ||
      item.image?.[2]?.url ||
      item.image?.[1]?.link ||
      item.image?.[1]?.url ||
      item.image?.[0]?.link ||
      item.image?.[0]?.url ||
      "https://via.placeholder.com/300";

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("AlbumDetail", { album: item })}
      >
        <Image source={{ uri: image }} style={styles.image} />

        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>

        {!!item.primaryArtists && (
          <Text numberOfLines={1} style={styles.artist}>
            {item.primaryArtists}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  /* ---------- INITIAL LOADER ---------- */
  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );

  /* ---------- MAIN UI ---------- */
  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}

        /* INFINITE SCROLL */
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}

        /* FOOTER LOADER */
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#FF7A00"
              style={{ margin: 20 }}
            />
          ) : null
        }
      />
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  card: {
    width: "48%",
    marginBottom: 18,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: "#FFF4E6",
  },

  title: {
    color: "#111",
    marginTop: 8,
    fontWeight: "700",
    fontSize: 15,
  },

  artist: {
    color: "#666",
    fontSize: 13,
    marginTop: 2,
  },

});