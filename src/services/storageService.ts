import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "music_queue";

export async function saveQueue(queue: any[]) {
  try {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.log("Save queue error", e);
  }
}

export async function loadQueue(): Promise<any[]> {
  try {
    const data = await AsyncStorage.getItem(QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Load queue error", e);
    return [];
  }
}

export async function clearQueue() {
  try {
    await AsyncStorage.removeItem(QUEUE_KEY);
  } catch (e) {
    console.log("Clear queue error", e);
  }
}