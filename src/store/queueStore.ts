import { create } from "zustand";

interface QueueState {
  queue: any[];
  index: number;

  add: (song: any) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQueue: (songs: any[]) => void;
  next: () => any | null;
  prev: () => any | null;
}

export const useQueueStore = create<QueueState>((set, get) => ({
  queue: [],
  index: 0,

 add:(song)=>
  set((state)=>{
    const newQueue=[...state.queue,song];
    import("../services/storageService").then(s=>s.saveQueue(newQueue));
    return {queue:newQueue};
  }),
  remove: (id) =>
    set((state) => ({
      queue: state.queue.filter((s) => s.id !== id),
    })),

  clear: () => set({ queue: [], index: 0 }),

  setQueue: (songs) => set({ queue: songs, index: 0 }),

  next: () => {
    const { queue, index } = get();
    if (index + 1 >= queue.length) return null;
    const nextSong = queue[index + 1];
    set({ index: index + 1 });
    return nextSong;
  },

  prev: () => {
    const { queue, index } = get();
    if (index - 1 < 0) return null;
    const prevSong = queue[index - 1];
    set({ index: index - 1 });
    return prevSong;
  },
}));