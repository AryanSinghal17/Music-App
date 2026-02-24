import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  title: string;
  artist?: string;
  image?: string;
  isPlaying: boolean;
  onPress: () => void;
  onToggle: () => void;
}

export default function MiniPlayer({
  title,
  artist,
  image,
  isPlaying,
  onPress,
  onToggle,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        {artist && <Text numberOfLines={1} style={styles.artist}>{artist}</Text>}
      </View>

      <TouchableOpacity
        onPress={(e:any)=>{
          e.stopPropagation?.();
          onToggle();
        }}
        style={styles.btn}
      >
        <Text style={styles.play}>{isPlaying ? "⏸" : "▶️"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    position:"absolute",
    bottom:-10,
    left:0,
    right:0,
    flexDirection:"row",
    alignItems:"center",
    padding:10,
    backgroundColor:"#111",
    elevation:10
  },
  image:{width:40,height:40,borderRadius:6,marginRight:10},
  info:{flex:1},
  title:{color:"#fff",fontWeight:"600"},
  artist:{color:"#aaa",fontSize:12},
  btn:{padding:6},
  play:{color:"#fff",fontSize:20}
});