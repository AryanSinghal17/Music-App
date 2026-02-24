import React,{useState,useEffect} from "react";
import {
View,Text,TextInput,TouchableOpacity,
FlatList,Image,StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";   // ✅ ADDED

import { searchSongs } from "../api";
import { getBestImage } from "../utils/helpers";
import { usePlayerStore } from "../store/playerStore";
import { play } from "../services/audioService";

const ORANGE="#F68B2C";

export default function SearchScreen({navigation}:any){

const route = useRoute<any>();   // ✅ ADDED

const [q,setQ]=useState("");
const [results,setResults]=useState<any[]>([]);
const [recent,setRecent]=useState<string[]>([
"Ariana Grande","Morgan Wallen","Justin Bieber",
"Drake","Olivia Rodrigo","The Weeknd","Taylor Swift"
]);

const [tab,setTab]=useState("Songs");


// ✅ AUTO-FILL FROM ROUTE
useEffect(()=>{
if(route.params?.query){
setQ(route.params.query);

// OPTIONAL: auto search immediately
if(typeof searchSongs==="function"){
load(route.params.query);
}
}
},[route.params?.query]);



/* search */
useEffect(()=>{
const t=setTimeout(()=>{
if(q.length>1){
load(q);
}else{
setResults([]);
}
},400);
return()=>clearTimeout(t);
},[q]);

const load=async(searchText?:string)=>{
const text=searchText ?? q;
const r=await searchSongs(text);
setResults(r.results||[]);
};


/* play song */
const start=async(item:any)=>{

const playable={
...item,
url:item.downloadUrl?.[4]?.url || item.downloadUrl?.[0]?.url
};

usePlayerStore.getState().setCurrentSong(playable);
await play(playable);
navigation.navigate("Player");

};


/* ---------- RENDER ---------- */

const SongRow=({item}:any)=>(
<View style={styles.row}>

<Image
source={{uri:getBestImage(item.image)}}
style={styles.rowImg}
/>

<View style={{flex:1}}>
<Text numberOfLines={1} style={styles.rowTitle}>{item.name}</Text>
<Text numberOfLines={1} style={styles.rowArtist}>{item.primaryArtists}</Text>
</View>

<TouchableOpacity onPress={()=>start(item)}>
<Text style={styles.playBtn}>▶</Text>
</TouchableOpacity>

<TouchableOpacity>
<Text style={styles.menu}>⋮</Text>
</TouchableOpacity>

</View>
);


/* ---------- EMPTY ---------- */

const Empty=()=>(
<View style={styles.empty}>
<Text style={{fontSize:60,color:ORANGE}}>☹</Text>
<Text style={styles.emptyTitle}>Not Found</Text>
<Text style={styles.emptyText}>
Sorry, the keyword you entered cannot be found.
</Text>
</View>
);


return(

<SafeAreaView style={styles.container}>

{/* SEARCH BAR */}
<View style={styles.searchRow}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Text style={styles.back}>←</Text>
</TouchableOpacity>

<View style={styles.searchBox}>

<TextInput
placeholder="Search songs, artists..."
value={q}
onChangeText={setQ}
style={{flex:1}}
/>

{q.length>0 && (
<TouchableOpacity onPress={()=>setQ("")}>
<Text style={{fontSize:18}}>✕</Text>
</TouchableOpacity>
)}

</View>

</View>


{/* RECENT SEARCHES */}
{q.length===0 && (

<View>

<View style={styles.recentHead}>
<Text style={styles.section}>Recent Searches</Text>

<TouchableOpacity onPress={()=>setRecent([])}>
<Text style={styles.clear}>Clear All</Text>
</TouchableOpacity>
</View>

{recent.map((r,i)=>(
<View key={i} style={styles.recentRow}>
<Text>{r}</Text>
<TouchableOpacity
onPress={()=>setRecent(recent.filter(x=>x!==r))}
>
<Text style={{fontSize:18}}>✕</Text>
</TouchableOpacity>
</View>
))}

</View>

)}


{/* FILTER TABS */}
{q.length>0 && (

<View style={styles.tabs}>
{["Songs","Artists","Albums"].map(t=>(
<TouchableOpacity key={t} onPress={()=>setTab(t)}>
<Text style={t===tab?styles.tabActive:styles.tab}>{t}</Text>
</TouchableOpacity>
))}
</View>

)}


{/* RESULTS */}
{q.length>0 && (

results.length===0 ? <Empty/> :

<FlatList
data={results}
renderItem={({item})=><SongRow item={item}/>}
keyExtractor={i=>i.id}
/>

)}

</SafeAreaView>
);
}


const styles=StyleSheet.create({

container:{flex:1,backgroundColor:"#F4F4F4"},

searchRow:{
flexDirection:"row",
alignItems:"center",
paddingHorizontal:16,
marginTop:6
},

back:{fontSize:24,marginRight:10},

searchBox:{
flex:1,
flexDirection:"row",
alignItems:"center",
backgroundColor:"#eee",
borderRadius:16,
paddingHorizontal:12,
height:44
},

recentHead:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:16,
marginTop:18
},

section:{fontWeight:"700",fontSize:16},

clear:{color:ORANGE},

recentRow:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:16,
paddingVertical:12
},

tabs:{
flexDirection:"row",
paddingHorizontal:16,
marginTop:12
},

tab:{
marginRight:14,
borderWidth:1,
borderColor:ORANGE,
borderRadius:20,
paddingHorizontal:14,
paddingVertical:6,
color:ORANGE
},

tabActive:{
marginRight:14,
backgroundColor:ORANGE,
borderRadius:20,
paddingHorizontal:14,
paddingVertical:6,
color:"#fff"
},

row:{
flexDirection:"row",
alignItems:"center",
paddingHorizontal:16,
paddingVertical:12
},

rowImg:{
width:52,
height:52,
borderRadius:10,
marginRight:12
},

rowTitle:{fontWeight:"600"},
rowArtist:{color:"#777",fontSize:12},

playBtn:{
backgroundColor:ORANGE,
color:"#fff",
padding:8,
borderRadius:20,
overflow:"hidden",
marginRight:10
},

menu:{fontSize:20},

empty:{
alignItems:"center",
marginTop:80,
paddingHorizontal:40
},

emptyTitle:{
fontSize:20,
fontWeight:"700",
marginTop:10
},

emptyText:{
textAlign:"center",
marginTop:6,
color:"#777"
}

});