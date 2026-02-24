import { useQueueStore } from "../store/queueStore";

export function useQueue() {
  const queue = useQueueStore((s) => s.queue);
  const index = useQueueStore((s) => s.index);

  const add = useQueueStore((s) => s.add);
  const remove = useQueueStore((s) => s.remove);
  const clear = useQueueStore((s) => s.clear);
  const setQueue = useQueueStore((s) => s.setQueue);
  const next = useQueueStore((s) => s.next);
  const prev = useQueueStore((s) => s.prev);

  return {
    queue,
    index,
    add,
    remove,
    clear,
    setQueue,
    next,
    prev,
  };
}