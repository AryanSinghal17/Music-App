import * as FileSystem from "expo-file-system";

const BASE_DIR =
  FileSystem.documentDirectory ??
  FileSystem.cacheDirectory ??
  "";

export async function downloadSong(url: string, filename: string) {
  try {
    if (!BASE_DIR) throw new Error("No filesystem directory available");

    const safeName = filename.replace(/[^\w\d]/g, "_");
    const path = BASE_DIR + safeName + ".mp4";

    const res = await FileSystem.downloadAsync(url, path);

    return res.uri;
  } catch (e) {
    console.log("Download error", e);
    return null;
  }
}

export function getLocalSongPath(filename: string) {
  const safeName = filename.replace(/[^\w\d]/g, "_");
  return BASE_DIR ? BASE_DIR + safeName + ".mp4" : null;
}