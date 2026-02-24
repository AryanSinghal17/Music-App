import { apiGet } from "./client";

export interface SongImage {
  quality: string;
  link?: string;
  url?: string;
}

export interface DownloadUrl {
  quality: string;
  link?: string;
  url?: string;
}

export interface Song {
  id: string;
  name: string;
  duration?: number | string;
  primaryArtists?: string;
  image?: SongImage[];
  downloadUrl?: DownloadUrl[];
}

export async function getSongById(id: string) {
  const res = await apiGet<{ success: boolean; data: Song[] }>(`/api/songs/${id}`);
  return res.data?.[0];
}

export async function getSongSuggestions(id: string) {
  const res = await apiGet<{ data: Song[] }>(`/api/songs/${id}/suggestions`);
  return res.data;
}