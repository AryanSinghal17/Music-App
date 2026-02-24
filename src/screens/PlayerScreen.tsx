
import React,{useEffect,useState} from "react";
import {
View,Text,Image,StyleSheet,TouchableOpacity
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePlayerStore } from "../store/playerStore";
import { getBestImage } from "../utils/helpers";
import { play,pause,seek } from "../services/audioService";

export default function PlayerScreen({navigation,route}:any){

const setSong = usePlayerStore(s=>s.setCurrentSong);
const song = usePlayerStore(s=>s.currentSong);
const isPlaying = usePlayerStore(s=>s.isPlaying);
const progress = usePlayerStore(s=>s.progress);
const duration = usePlayerStore(s=>s.duration);
const songs = usePlayerStore(s=>s.songs);
const index = songs.findIndex(s=>s.id===song.id);

const [local,setLocal]=useState(0);

/* if opened with params */
useEffect(()=>{
if(route?.params?.song){
setSong(route.params.song);
}
},[]);

/* sync slider */
useEffect(()=>{
setLocal(progress||0);
},[progress]);

if(!song){
return(
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<Text>No song playing</Text>
</View>
);
}

const format=(sec:number=0)=>{
const m=Math.floor(sec/60);
const s=Math.floor(sec%60);
return `${m}:${s<10?"0":""}${s}`;
};

return(

<SafeAreaView style={styles.container}>

{/* HEADER */}
<View style={styles.header}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Text style={styles.topIcon}>←</Text>
</TouchableOpacity>

</View>

{/* COVER */}
<Image
source={{uri:getBestImage(song.image)}}
style={styles.cover}
/>

{/* TITLE */}
<Text style={styles.title}>{song.name}</Text>
<Text style={styles.artist}>{song.primaryArtists}</Text>

{/* SLIDER */}
<View style={{width:"90%"}}>

<Slider
minimumValue={0}
maximumValue={duration||1}
value={local}
minimumTrackTintColor="#F68B2C"
maximumTrackTintColor="#ddd"
thumbTintColor="#F68B2C"
onValueChange={setLocal}
onSlidingComplete={(v)=>seek(v)}
/>

<View style={styles.timeRow}>
<Text style={styles.time}>{format(local)}</Text>
<Text style={styles.time}>{format(duration)}</Text>
</View>

</View>

{/* CONTROLS */}
<View style={styles.controls}>

<TouchableOpacity
onPress={()=>{
  if(index > 0){
    const prevSong = songs[index-1];
    setSong(prevSong);
    play(prevSong);
  }
}}
>
{/* <Text style={styles.small}>⏮</Text> */}
</TouchableOpacity>

<TouchableOpacity onPress={()=>seek(Math.max(local-10,0))}>
<Text style={styles.small}>↺10</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.playBtn}
onPress={()=> isPlaying ? pause() : play()}
>
<Text style={styles.playIcon}>
{isPlaying ? "⏸" : "▶"}
</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>seek(Math.min(local+10,duration))}>
<Text style={styles.small}>10↻</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>{
  if(!songs.length) return;

  const randomIndex = Math.floor(Math.random()*songs.length);
  const nextSong = songs[randomIndex];

  setSong(nextSong);
  play(nextSong);
}}
>
{/* <Text style={styles.small}>⏭</Text> */}
</TouchableOpacity>

</View>

</SafeAreaView>
);
}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F4F4F4",
alignItems:"center"
},

header:{
width:"100%",
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20,
marginTop:8
},

topIcon:{
fontSize:26,
color:"#333"
},

cover:{
width:"85%",
height:340,
borderRadius:30,
marginTop:10
},

title:{
fontSize:26,
fontWeight:"700",
marginTop:20,
textAlign:"center"
},

artist:{
fontSize:16,
color:"#666",
marginTop:6,
marginBottom:18,
textAlign:"center"
},

timeRow:{
flexDirection:"row",
justifyContent:"space-between"
},

time:{
color:"#444"
},

controls:{
flexDirection:"row",
alignItems:"center",
marginTop:24
},

small:{
fontSize:24,
marginHorizontal:18,
color:"#222"
},

playBtn:{
backgroundColor:"#F68B2C",
width:78,
height:78,
borderRadius:39,
justifyContent:"center",
alignItems:"center"
},

playIcon:{
color:"#fff",
fontSize:30
},

bottomRow:{
flexDirection:"row",
marginTop:28
},

bottomIcon:{
fontSize:22,
marginHorizontal:18,
color:"#333"
}

});
