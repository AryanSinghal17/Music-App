import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BASE = "https://saavn.sumit.co/api";

export default function ArtistDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const { artist } = route.params;

  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- ARTIST IMAGE ---------- */
  const image =
    artist.image?.[2]?.link ||
    artist.image?.[2]?.url ||
    artist.image?.[1]?.link ||
    artist.image?.[1]?.url ||
    artist.image?.[0]?.link ||
    artist.image?.[0]?.url ||
    "https://via.placeholder.com/300";

  /* ---------- LOAD SONGS (RELIABLE METHOD) ---------- */
  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    try {
      // search songs using artist name (most reliable)
      const res = await fetch(
        `${BASE}/search/songs?query=${encodeURIComponent(artist.name)}`
      );

      const json = await res.json();

      setSongs(json?.data?.results ?? []);
    } catch (e) {
      console.log("Artist songs error:", e);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- RENDER SONG ---------- */
  const renderSong = ({ item }: any) => (
    <TouchableOpacity style={styles.song}>
      <Text numberOfLines={1} style={styles.songTitle}>
        {item.name}
      </Text>

      <Text numberOfLines={1} style={styles.artistName}>
        {item.primaryArtists ||
          item.artists?.primary?.map((a: any) => a.name).join(", ") ||
          ""}
      </Text>
    </TouchableOpacity>
  );

  /* ---------- LOADER ---------- */
  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );

  /* ---------- MAIN UI ---------- */
  return (
    <View style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* ARTIST IMAGE */}
      <Image source={{ uri: image }} style={styles.cover} />

      {/* ARTIST NAME */}
      <Text style={styles.title}>{artist.name}</Text>

      {/* SONG LIST */}
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No songs found
          </Text>
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
    padding: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  back: {
    color: "#FF7A00",
    fontWeight: "600",
    marginBottom: 12,
    fontSize: 16,
  },

  cover: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 200,   // round artist face
    marginBottom: 16,
    backgroundColor: "#FFF4E6",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 18,
  },

  song: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  songTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  artistName: {
    color: "#666",
    marginTop: 2,
  },

});