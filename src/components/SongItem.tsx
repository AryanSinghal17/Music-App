import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  title: string;
  artist?: string;
  image?: string;
  onPress: () => void;
}

export default function SongItem({ title, artist, image, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {image && <Image source={{ uri: image }} style={styles.img} />}
      <View style={{ flex:1 }}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        {artist && <Text numberOfLines={1} style={styles.artist}>{artist}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",padding:12},
  img:{width:50,height:50,borderRadius:8,marginRight:12},
  title:{fontWeight:"600",fontSize:15},
  artist:{color:"#777",fontSize:12}
});