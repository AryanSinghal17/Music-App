import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev}><Text style={styles.btn}>⏮</Text></TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}><Text style={styles.btnBig}>{isPlaying ? "⏸" : "▶️"}</Text></TouchableOpacity>
      <TouchableOpacity onPress={onNext}><Text style={styles.btn}>⏭</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:20},
  btn:{fontSize:28,marginHorizontal:20},
  btnBig:{fontSize:36,marginHorizontal:20}
});