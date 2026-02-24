import React from "react";
import Slider from "@react-native-community/slider";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  progress: number;
  duration: number;
  onSeek: (value:number)=>void;
}

export default function SeekBar({ progress, duration, onSeek }: Props) {
  return (
    <View>
      <Slider
  minimumValue={0}
  maximumValue={duration || 1}
  value={progress}
  onSlidingComplete={onSeek}
  minimumTrackTintColor="#F68B2C"
  maximumTrackTintColor="#dddddd"
  thumbTintColor="#F68B2C"
/>
      <View style={styles.row}>
        <Text>{Math.floor(progress)}s</Text>
        <Text>{Math.floor(duration)}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",justifyContent:"space-between"}
});