import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";

const EnterRoom: React.FC = ({ navigation }) => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    console.log("clicked!");
    const endpoint = `http://10.0.0.67:6021`;
    console.log("ep", endpoint);
    try {
      const result = await axios.post(`${endpoint}/${roomId}`, {
        username: username,
      });
      console.log("roomId", roomId, result.data);
      navigation.navigate("Room Lobby (Guest)", {
        userId: result.data.userId,
        username: username,
        roomId: result.data.roomId,
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View>
      <Text>CreateRoom</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={roomId}
          onChangeText={setRoomId}
          placeholder="Room ID"
        />
      </SafeAreaView>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default EnterRoom;
