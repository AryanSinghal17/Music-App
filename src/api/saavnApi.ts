const BASE = "https://saavn.sumit.co/api";

export async function searchAlbums(query: string) {
  const res = await fetch(`${BASE}/search/albums?query=${query}`);
  const json = await res.json();
  return json.data?.results ?? [];
}