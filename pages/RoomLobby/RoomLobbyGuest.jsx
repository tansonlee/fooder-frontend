import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";

const RoomLobbyGuest = ({ route, navigation }) => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)

  // make these the same.. only difference is one has a button

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // setSocket(io("http://10.0.0.67:6021"));
    socket.emit("join", {
      username: route.params.username,
      roomId: route.params.roomId,
    });
    socket.on("user joined", (newUsers) => {
      console.log("new userG", newUsers);
      setUsers(newUsers);
    });
    socket.on("found restaurants", (totalRestaurantList) => {
      console.log("RESTAURANTS HERE");
      //console.log(totalRestaurantList);
      navigation.navigate("Search", {
        totalRestaurantList: totalRestaurantList,
      });
    });
  }, []);

  return (
    <View>
      <Text>Room ID: {route.params.roomId}</Text>
      {users.map((user, i) => {
        console.log("NEW USER", user);
        /*
        KEY NEEDS TO BE FIXED (userID?)
        */
        return <Text key={i}>{user}</Text>;
      })}
    </View>
  );
};

export default RoomLobbyGuest;