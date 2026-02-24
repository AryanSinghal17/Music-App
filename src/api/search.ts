import { apiGet } from "./client";
import { Song } from "./songs";

interface SearchSongsResponse {
  status: string;
  data: {
    results: Song[];
    total: number;
    start: number;
  };
}

export async function searchSongs(query: string, page = 1, limit = 20) {
  const res = await apiGet<SearchSongsResponse>("/api/search/songs", {
    query,
    page,
    limit,
  });

  return res.data;
}

export async function globalSearch(query: string) {
  return apiGet("/api/search", { query });
}