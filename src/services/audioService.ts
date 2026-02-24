import { Audio } from "expo-av";
import { usePlayerStore } from "../store/playerStore";

let sound: Audio.Sound | null = null;
let currentUrl: string | null = null;

export async function play(song?: any) {
  try {

    /* ---------- 1️⃣ IF NEW SONG PASSED ---------- */
    if (song?.url && song.url !== currentUrl) {

      /* unload previous only if different song */
      if (sound) {
        await sound.unloadAsync();
        sound = null;
      }

      currentUrl = song.url;

      sound = new Audio.Sound();

      await sound.loadAsync(
        { uri: song.url },
        { shouldPlay: true }
      );

      usePlayerStore.getState().setPlaying(true);

      /* progress listener */
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (!status.isLoaded) return;

        usePlayerStore.getState().setProgress(
          (status.positionMillis || 0) / 1000
        );

        usePlayerStore.getState().setDuration(
          (status.durationMillis || 0) / 1000
        );

        if (status.didJustFinish) {
          usePlayerStore.getState().setPlaying(false);
        }
      });

      return;
    }

    /* ---------- 2️⃣ RESUME PAUSED SONG ---------- */
    if (sound) {
      const status = await sound.getStatusAsync();

      if (status.isLoaded && !status.isPlaying) {
        await sound.playAsync();   // ✅ resumes correctly
        usePlayerStore.getState().setPlaying(true);
      }
    }

  } catch (e) {
    console.log("PLAY ERROR", e);
  }
}

export async function pause() {
  try {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
      usePlayerStore.getState().setPlaying(false);
    }

  } catch (e) {
    console.log("PAUSE ERROR", e);
  }
}

export async function seek(sec: number) {
  try {
    if (!sound) return;

    await sound.setPositionAsync(sec * 1000);

  } catch (e) {
    console.log("SEEK ERROR", e);
  }
}

/* OPTIONAL but useful */
export async function stop() {
  try {
    if (!sound) return;

    await sound.stopAsync();
    usePlayerStore.getState().setPlaying(false);

  } catch (e) {}
}

/* OPTIONAL cleanup */
export async function unload() {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
      currentUrl = null;
    }
  } catch (e) {}
}