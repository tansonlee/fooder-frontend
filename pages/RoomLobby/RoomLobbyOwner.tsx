import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import io from "socket.io-client";

type Props = {
  navigation: any;
};

const RoomLobbyOwner = ({ route, navigation }): Props => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)
  const socket = io("http://10.100.26.6:6021");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // setSocket(io("http://10.100.26.6:6021"));
    socket.emit("join", {
      username: "Joseph",
      roomId: route.params.roomId,
    });
    socket.on("user joined", (newUser) => {
      console.log("new user", newUser);
      setUsers([...users, newUser]);
    });
  }, []);

  return (
    <View>
      <Text>Room ID: {route.params.roomId}</Text>
      {users.map((user) => {
        console.log("NEW USER", user);
        /*
        KEY NEEDS TO BE FIXED (userID?)
        */
        return <Text key={user}>{user}</Text>;
      })}
    </View>
  );
};

export default RoomLobbyOwner;
