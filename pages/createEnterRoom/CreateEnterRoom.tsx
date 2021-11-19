import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

type Props = {
  navigation: any;
};

const CreateEnterRoom = ({ navigation }): Props => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)}
  const handleCreateRoomPress = () => {
    navigation.navigate("CreateRoom");
  };
  const handleEnterRoomPress = () => {
    navigation.navigate("EnterRoom");
  };

  return (
    <View>
      <Text>CreateEnterRoom</Text>
      <Button title="create a room" onPress={handleCreateRoomPress} />
      <Button title="enter a room" onPress={handleEnterRoomPress} />
    </View>
  );
};

export default CreateEnterRoom;
