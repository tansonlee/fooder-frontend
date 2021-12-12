import React from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const EnterRoom: React.FC = ({ navigation }) => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    console.log("clicked!");
    const endpoint = `http://10.100.26.6:6021`;
    console.log("ep", endpoint);
    try {
      const result = await axios.post(`${endpoint}/${roomId}`, {
        username: username,
      });
      console.log("roomId", roomId, result.data);
      navigation.navigate("Room Lobby (Guest)", {
        userId: result.data.userId,
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
          value={roomId}
          onChangeText={setRoomId}
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </SafeAreaView>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default EnterRoom;
