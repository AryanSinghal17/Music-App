import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { getImage } from "../utils/getImage";

export default function SongsScreen() {

  const navigation = useNavigation<any>();

  const [songs, setSongs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadInitial();
  }, []);

  /* ---------- INITIAL LOAD ---------- */
  async function loadInitial() {
    try {
      const res = await fetch(
        `https://saavn.sumit.co/api/search/songs?query=arijit&page=1`
      );
      const json = await res.json();
      setSongs(json.data?.results ?? []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- LOAD MORE ---------- */
  async function loadMore() {
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const next = page + 1;

      const res = await fetch(
        `https://saavn.sumit.co/api/search/songs?query=arijit&page=${next}`
      );

      const json = await res.json();

      setSongs(prev => [...prev, ...(json.data?.results ?? [])]);
      setPage(next);

    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  }

  /* ---------- REDIRECT TO SEARCH ---------- */
  function handlePlay(song:any){
    navigation.navigate("Search", {
      query: song.name
    });
  }

  /* ---------- RENDER SONG ---------- */
  const renderItem = ({ item }:any) => {

    const image =
      item.image?.[2]?.link ||
      item.image?.[1]?.link ||
      item.image?.[0]?.link ||
      "https://via.placeholder.com/100";

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.8}
        onPress={()=>handlePlay(item)}
      >

        {/* IMAGE */}
        <Image source={{ uri: getImage(item) }} style={styles.image}/>
        {/* TEXT */}
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>

          <Text numberOfLines={1} style={styles.artist}>
            {item.primaryArtists}
          </Text>
        </View>

        {/* PLAY BUTTON */}
        <TouchableOpacity
          style={styles.playBtn}
          onPress={()=>handlePlay(item)}
        >
          <Text style={{color:"white",fontWeight:"bold"}}>▶</Text>
        </TouchableOpacity>

      </TouchableOpacity>
    );
  };

  /* ---------- LOADER ---------- */
  if(loading)
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00"/>
      </View>
    );

  /* ---------- MAIN ---------- */
  return(
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(i)=>i.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#FF7A00"
              style={{margin:20}}
            />
          ):null
        }
      />
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({

  container:{ flex:1, backgroundColor:"#fff" },

  loader:{
    flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#fff"
  },

  row:{
    flexDirection:"row",
    alignItems:"center",
    padding:14,
    borderBottomWidth:1,
    borderColor:"#eee"
  },

  image:{
    width:60,
    height:60,
    borderRadius:12,
    backgroundColor:"#FFF4E6"
  },

  info:{
    flex:1,
    marginLeft:12
  },

  title:{
    fontSize:16,
    fontWeight:"600",
    color:"#111"
  },

  artist:{
    color:"#666",
    marginTop:2
  },

  playBtn:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:"#FF7A00",
    justifyContent:"center",
    alignItems:"center"
  }

});