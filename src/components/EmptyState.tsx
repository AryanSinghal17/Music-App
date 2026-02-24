import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  message?: string;
}

export default function EmptyState({ message="No data found" }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center",padding:20},
  text:{color:"#777",fontSize:16,textAlign:"center"}
});