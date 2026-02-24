import { apiGet } from "./client";
import { Song } from "./songs";

export interface Artist {
  id: string;
  name: string;
  image?: { quality: string; url?: string; link?: string }[];
}

export async function getArtistById(id: string) {
  const res = await apiGet<{ success: boolean; data: Artist }>(`/api/artists/${id}`);
  return res.data;
}

export async function getArtistSongs(id: string) {
  const res = await apiGet<{ success: boolean; data: Song[] }>(
    `/api/artists/${id}/songs`
  );
  return res.data;
}

export async function getArtistAlbums(id: string) {
  const res = await apiGet(`/api/artists/${id}/albums`);
  return res;
}

export function getArtistImage(
  images?: { quality: string; url?: string; link?: string }[]
) {
  if (!images?.length) return undefined;

  // prefer biggest image
  const best =
    images.find((i) => i.quality === "500x500") ??
    images[images.length - 1];

  return best?.url || best?.link;
}