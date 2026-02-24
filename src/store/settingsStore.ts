import { create } from "zustand";

interface SettingsState {
  shuffle: boolean;
  repeat: boolean;
  volume: number;

  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (v: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  shuffle: false,
  repeat: false,
  volume: 1,

  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  toggleRepeat: () => set((s) => ({ repeat: !s.repeat })),
  setVolume: (v) => set({ volume: v }),
}));