export interface SongImage {
  quality: string;
  link?: string;
  url?: string;
}

export interface SongDownload {
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
  downloadUrl?: SongDownload[];

  album?: {
    id: string;
    name: string;
    url?: string;
  };

  year?: string;
  language?: string;
}