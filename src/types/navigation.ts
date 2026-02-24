export type RootStackParamList = {
  Home: undefined;
  Player: { song: any };
  Queue: undefined;
  Search: undefined;
  Artist: { artistId: string; artistName?: string };
};