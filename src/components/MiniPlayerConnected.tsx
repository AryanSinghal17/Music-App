import React from "react";
import MiniPlayer from "./MiniPlayer";
import { useNavigation } from "@react-navigation/native";
import { usePlayerStore } from "../store/playerStore";

export default function MiniPlayerConnected() {
  const navigation = useNavigation<any>();

  const {
    currentSong,
    isPlaying,
    setPlaying,
  } = usePlayerStore();

  // hide if no song
  if (!currentSong) return null;

  return (
    <MiniPlayer
      title={currentSong.name}
      artist={currentSong.primaryArtists}
      image={currentSong.image?.[2]?.link}
      isPlaying={isPlaying}

      // open full player
      onPress={() => navigation.navigate("Player")}

      // toggle play/pause
      onToggle={() => setPlaying(!isPlaying)}
    />
  );
}