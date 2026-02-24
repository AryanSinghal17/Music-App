const BASE_URL = "https://saavn.sumit.co";

type Params = Record<string, string | number | undefined>;

function buildUrl(path: string, params?: Params) {
  const url = new URL(BASE_URL + path);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
}

export async function apiGet<T>(path: string, params?: Params): Promise<T> {
  const res = await fetch(buildUrl(path, params));

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}