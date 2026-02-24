import React from "react";
import { View, FlatList } from "react-native";
import SongItem from "../components/SongItem";
import { useQueue } from "../hooks/useQueue";
import { getBestImage } from "../utils/helpers";

export default function QueueScreen({navigation}:any){

  const { queue } = useQueue();

  return(
    <View style={{flex:1}}>
      <FlatList
        data={queue}
        keyExtractor={(i)=>i.id}
        renderItem={({item})=>(
          <SongItem
            title={item.name}
            artist={item.primaryArtists}
            image={getBestImage(item.image)}
            onPress={()=>navigation.navigate("Player",{song:item})}
          />
        )}
      />
    </View>
  );
}