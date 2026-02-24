import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  /* LOAD SAVED USER */
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await AsyncStorage.getItem("username");
    if (user) {
      setSavedName(user);
      setName(user);
    }
  };

  /* SAVE USER */
  const saveUser = async () => {
    if (!name.trim()) return;

    await AsyncStorage.setItem("username", name);
    setSavedName(name);

    Alert.alert("Welcome", `Welcome ${name} 👋`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      {/* USER IMAGE */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />

      {/* SAVED NAME */}
      {savedName ? (
        <Text style={styles.current}>User: {savedName}</Text>
      ) : null}

      {/* INPUT */}
      <TextInput
        placeholder="Enter user name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveUser}>
        <Text style={styles.saveText}>Save User</Text>
      </TouchableOpacity>

      {/* NAVIGATION BUTTONS */}
      <View style={styles.menu}>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.itemText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Songs")}
        >
          <Text style={styles.itemText}>Go to Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Artist")}
        >
          <Text style={styles.itemText}>Go to Artist</Text>
        </TouchableOpacity>

  <TouchableOpacity
  style={styles.item}
  onPress={() =>
    Alert.alert(
      "About This App 🎧",
      "This is a React Native Music Player built using the JioSaavn API.\n\nFeatures:\n• Browse songs, artists, albums\n• Full music player with seek bar\n• Persistent Mini Player synced with Full Player\n• Queue management (add/remove/reorder)\n• Background playback support\n• User profile settings\n\nBuilt with React Native, Expo, Zustand, and AsyncStorage."
    )
  }
>
  <Text style={styles.itemText}>About App</Text>
</TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#FF7A00",
  },

  current: {
    color: "#666",
    marginBottom: 10,
    fontSize: 14,
  },

  input: {
    width: "100%",
    backgroundColor: "#FFF4E6",
    borderRadius: 12,
    padding: 14,
    color: "#111",
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: "#FF7A00",
    padding: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  menu: {
    width: "100%",
    gap: 12,
  },

  item: {
    backgroundColor: "#FFF4E6",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFE0BF"
  },

  itemText: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "500"
  },
});