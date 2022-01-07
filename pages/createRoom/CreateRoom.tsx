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
import Config from "react-native-config";

const CreateRoom: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    console.log("clicked!");
    const endpoint = `http://10.0.0.67:6021/create-room`;
    console.log("ep", endpoint);
    try {
      const result = await axios.post(endpoint, { username: username });
      console.log("username", username, result.data);
      navigation.navigate("Room Lobby (Owner)", {
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

export default CreateRoom;
