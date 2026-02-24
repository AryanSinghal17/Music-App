import React, { useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { Audio } from "expo-av";

import RootNavigator from "./src/navigation/RootNavigator";
import MiniPlayer from "./src/components/MiniPlayer";

import { loadQueue } from "./src/services/storageService";
import { useQueueStore } from "./src/store/queueStore";
import { usePlayerStore } from "./src/store/playerStore";

import { play, pause } from "./src/services/audioService";
import { getBestImage } from "./src/utils/helpers";

import { RootStackParamList } from "./src/navigation/types";

/* ---------- GLOBAL NAV REF ---------- */
export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

/* ---------- APP ---------- */
export default function App() {
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  /* ---------- INITIAL SETUP ---------- */
  useEffect(() => {
    setupAudio();
    restoreQueue();
  }, []);

  async function setupAudio() {
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    } catch (e) {
      console.log("Audio setup failed", e);
    }
  }

  async function restoreQueue() {
    const saved = await loadQueue();
    if (saved?.length) {
      useQueueStore.getState().setQueue(saved);
    }
  }

  /* ---------- UI ---------- */
  return (
    <View style={{ flex: 1 }}>
      {/* STATUS BAR */}
      <StatusBar style="dark" />

      {/* NAVIGATION */}
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>

      {/* GLOBAL MINI PLAYER */}
      {currentSong && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 80, // slightly above tab bar
          }}
        >
          <MiniPlayer
            title={currentSong.name}
            artist={currentSong.primaryArtists}
            image={getBestImage(currentSong.image)}
            isPlaying={isPlaying}

            // open full player
            onPress={() => navigationRef.navigate("Player")}

            // toggle play/pause + update store
            onToggle={() => {
              if (isPlaying) {
                pause();
                usePlayerStore.getState().setPlaying(false);
              } else {
                play();
                usePlayerStore.getState().setPlaying(true);
              }
            }}
          />
        </View>
      )}
    </View>
  );
}