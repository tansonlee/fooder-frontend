import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";

type Props = {
  navigation: any;
};

const RoomLobbyGuest = ({ route, navigation }): Props => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // setSocket(io("http://10.0.0.67:6021"));
    socket.emit("join", {
      username: route.params.username,
      roomId: route.params.roomId,
    });
    socket.on("user joined", (newUser) => {
      console.log("new user", newUser);
      setUsers((prev) => [...prev, newUser]);
    });
  }, []);

  return (
    <View>
      <Text>Room ID: {route.params.roomId}</Text>
    </View>
  );
};

export default RoomLobbyGuest;
