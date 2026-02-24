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

export default function AlbumDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const { album } = route.params;

  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const image =
    album.image?.[2]?.link ||
    album.image?.[2]?.url ||
    album.image?.[0]?.link ||
    album.image?.[0]?.url;

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    try {
      const res = await fetch(
        `${BASE}/search/songs?query=${encodeURIComponent(album.name)}`
      );
      const json = await res.json();
      setSongs(json.data?.results ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const renderSong = ({ item }: any) => (
    <TouchableOpacity style={styles.song}>
      <Text numberOfLines={1} style={styles.songTitle}>
        {item.name}
      </Text>

      <Text numberOfLines={1} style={styles.artist}>
        {item.primaryArtists}
      </Text>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );

  return (
    <View style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* ALBUM COVER */}
      <Image source={{ uri: image }} style={styles.cover} />

      {/* TITLE */}
      <Text style={styles.title}>{album.name}</Text>

      {!!album.primaryArtists && (
        <Text style={styles.artist}>{album.primaryArtists}</Text>
      )}

      {/* SONG LIST */}
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  backBtn: {
    marginBottom: 12,
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF7A00",
  },

  cover: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 22,
    marginBottom: 16,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  artist: {
    color: "#666",
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
});