// pick best image from API array
export function getBestImage(imageArr?: any[]): string | undefined {
  if (!imageArr || !imageArr.length) return undefined;

  return (
    imageArr.find((i) => i.quality === "500x500")?.link ||
    imageArr.find((i) => i.quality === "500x500")?.url ||
    imageArr[imageArr.length - 1]?.link ||
    imageArr[imageArr.length - 1]?.url
  );
}

// pick best audio url (prefer 320kbps)
export function getBestAudio(downloadArr?: any[]): string | undefined {
  if (!downloadArr || !downloadArr.length) return undefined;

  return (
    downloadArr.find((i) => i.quality === "320kbps")?.link ||
    downloadArr.find((i) => i.quality === "320kbps")?.url ||
    downloadArr[downloadArr.length - 1]?.link ||
    downloadArr[downloadArr.length - 1]?.url
  );
}

// simple random shuffle (for queue shuffle mode)
export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}