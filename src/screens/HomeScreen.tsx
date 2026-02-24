
import React,{useEffect,useState} from "react";
import {
View,Text,FlatList,Image,StyleSheet,
TouchableOpacity,ScrollView,Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlayerStore } from "../store/playerStore";
import { play } from "../services/audioService";
import { searchSongs } from "../api";
import { getBestImage } from "../utils/helpers";

const {width}=Dimensions.get("window");
const ORANGE="#F68B2C";

/* decode HTML */
const decodeHTML=(text:string="")=>
text.replace(/&quot;/g,'"')
.replace(/&amp;/g,'&')
.replace(/&#039;/g,"'")
.replace(/&lt;/g,'<')
.replace(/&gt;/g,'>');

export default function HomeScreen({navigation}:any){

const [songs,setSongs]=useState<any[]>([]);

useEffect(()=>{ load(); },[]);

const load=async()=>{
const res=await searchSongs("arijit");
setSongs(res.results||[]);
};

/* ---------- SONG CARD ---------- */

const SongCard=({item}:any)=>(
<TouchableOpacity
style={styles.card}
onPress={async()=>{
const playable={
...item,
url:item.downloadUrl?.[4]?.url || item.downloadUrl?.[0]?.url
};
usePlayerStore.getState().setCurrentSong(playable);
await play(playable);
navigation.navigate("Player");
}}
>
<Image source={{uri:getBestImage(item.image)}} style={styles.cardImg}/>
<Text numberOfLines={2} style={styles.cardText}>
{decodeHTML(item.name)}
</Text>
</TouchableOpacity>
);

/* ---------- ARTIST CARD ---------- */

const ArtistCard=({item}:any)=>{

const artistImg =
item.artists?.primary?.[0]?.image?.[2]?.url ||
item.artists?.primary?.[0]?.image?.[2]?.link ||
getBestImage(item.image);

const artistName =
item.artists?.primary?.[0]?.name ||
item.primaryArtists?.split(",")[0] ||
"Artist";

return(
<View style={styles.artist}>
<Image source={{uri:artistImg}} style={styles.artistImg}/>
<Text numberOfLines={1} style={styles.artistText}>{artistName}</Text>
</View>
);
};

/* ---------- SECTION HEADER ---------- */

const Section=({title}:{title:string})=>(
<View style={styles.sectionRow}>
<Text style={styles.section}>{title}</Text>
<Text style={styles.see}>See All</Text>
</View>
);

/* ---------- UI ---------- */

return(

<SafeAreaView style={{flex:1, backgroundColor:"#F4F4F4"}}>

<ScrollView
style={{flex:1}}
contentContainerStyle={{paddingBottom:100}}
showsVerticalScrollIndicator={false}
>

{/* HEADER */}
<View style={styles.header}>
<Text style={styles.logo}>🎵 LOKAl-MUSIC</Text>

<TouchableOpacity onPress={()=>navigation.navigate("Search")}>
<Text style={{fontSize:22}}>🔍</Text>
</TouchableOpacity>
</View>

{/* CONTENT */}

<Section title="Recently Played" />

<FlatList
  horizontal
  data={songs.slice(0, 8)}
  renderItem={({ item }) => <SongCard item={item} />}
  keyExtractor={(i) => i.id}
  showsHorizontalScrollIndicator={false}
/>


<Section title="Artists" />

<FlatList
  horizontal
  data={songs.slice(0, 8)}
  renderItem={({ item }) => <ArtistCard item={item} />}
  keyExtractor={(i) => "a" + i.id}
  showsHorizontalScrollIndicator={false}
/>


<Section title="Most Played" />

<FlatList
  horizontal
  data={songs.slice(8, 16)}
  renderItem={({ item }) => <SongCard item={item} />}
  keyExtractor={(i) => "m" + i.id}
  showsHorizontalScrollIndicator={false}
/>


{/* ✅ NEW: Frequent Play (different songs) */}
<Section title="Frequent Play" />

<FlatList
  horizontal
  data={songs.slice(16, 24)}
  renderItem={({ item }) => <SongCard item={item} />}
  keyExtractor={(i) => "f" + i.id}
  showsHorizontalScrollIndicator={false}
/>

</ScrollView>

{/* ---------- BOTTOM NAV ---------- */}

</SafeAreaView>
);
}

/* ---------- NAV BUTTON ---------- */

const Nav=({label,onPress,active=false}:any)=>(
<TouchableOpacity style={styles.navItem} onPress={onPress}>
<Text style={{
color:active?ORANGE:"#888",
fontWeight:active?"700":"500",
fontSize:12
}}>
{label}
</Text>
</TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles=StyleSheet.create({

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:8,
paddingHorizontal:16
},

logo:{fontSize:22,fontWeight:"700"},

sectionRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:12,
marginBottom:6,
paddingHorizontal:16
},

section:{fontSize:18,fontWeight:"700"},

see:{color:ORANGE,fontWeight:"600"},

card:{width:120,marginRight:12},

cardImg:{width:120,height:120,borderRadius:18,marginBottom:6},

cardText:{fontSize:13,color:"#333"},

artist:{alignItems:"center",marginRight:12},

artistImg:{width:86,height:86,borderRadius:43,marginBottom:4},

artistText:{width:86,textAlign:"center",fontSize:12,color:"#333"},

bottomNav:{
position:"absolute",
bottom:0,
left:0,
right:0,
height:72,
backgroundColor:"#fff",
flexDirection:"row",
alignItems:"center",
borderTopWidth:1,
borderColor:"#eee",
paddingHorizontal:10
},

navItem:{flex:1,alignItems:"center"}

});
