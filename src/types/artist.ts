export interface ArtistImage {
  quality: string;
  link?: string;
  url?: string;
}

export interface Artist {
  id: string;
  name: string;
  image?: ArtistImage[];
}