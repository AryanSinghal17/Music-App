import { usePlayerStore } from "../store/playerStore";

export function usePlayer() {
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const progress = usePlayerStore((s) => s.progress);
  const duration = usePlayerStore((s) => s.duration);

  const setSong = usePlayerStore((s) => s.setSong);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);
  const setProgress = usePlayerStore((s) => s.setProgress);
  const setDuration = usePlayerStore((s) => s.setDuration);
  const reset = usePlayerStore((s) => s.reset);

  return {
    currentSong,
    isPlaying,
    progress,
    duration,
    setSong,
    play,
    pause,
    setProgress,
    setDuration,
    reset,
  };
}