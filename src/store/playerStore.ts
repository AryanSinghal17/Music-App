import { create } from "zustand";

interface PlayerState {
  currentSong: any | null;
  isPlaying: boolean;
  progress: number;
  duration: number;

  songs: any[];
  setSongs: (s: any[]) => void;

  setCurrentSong: (song: any) => void;
  setPlaying: (val: boolean) => void;
  setProgress: (val: number) => void;
  setDuration: (val: number) => void;

  // ✅ STEP 1 ADD THIS
  playSong: (song: any) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: null,
  isPlaying: false,
  progress: 0,
  duration: 0,

  songs: [],
  setSongs: (songs) => set({ songs }),

  setCurrentSong: (song) => set({ currentSong: song }),

  setPlaying: (val) => set({ isPlaying: val }),

  setProgress: (val) => set({ progress: val }),

  setDuration: (val) => set({ duration: val }),

  // ✅ NEW: ONE FUNCTION TO PLAY SONG
  playSong: (song) =>
    set({
      currentSong: song,
      isPlaying: true,
      progress: 0,
    }),
}));