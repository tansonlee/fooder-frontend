import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

type Props = {
  navigation: any;
};

const RoomLobbyGuest = ({ route, navigation }): Props => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)

  /*
  const socket = io("http://10.100.26.6:6021");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // setSocket(io("http://10.100.26.6:6021"));
    socket.emit("join", {
      username: "hello",
      roomId: route.params.roomId,
    });
    socket.on("user joined", (newUser) => {
      console.log("new user", newUser);
      setUsers([...users, newUser]);
    });
  }, []);
  */

  return (
    <View>
      <Text>Room ID: {route.params.roomId}</Text>
    </View>
  );
};

export default RoomLobbyGuest;
