import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import CreateEnterRoom from "./pages/createEnterRoom/CreateEnterRoom";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";
import RoomLobbyOwner from "./pages/RoomLobby/RoomLobbyOwner";
import RoomLobbyGuest from "./pages/RoomLobby/RoomLobbyGuest";
import Search from "./pages/search/Search";

const MainStack = createNativeStackNavigator<TopNavigatorParamsList>();
const MainNavigator: React.FC = () => {
  const { Navigator, Screen } = MainStack;

  return (
    <Navigator>
      <Screen name="Home" component={CreateEnterRoom} />
      <Screen name="Create Room" component={CreateRoom} />
      <Screen name="Enter Room" component={EnterRoom} />
      <Screen name="Room Lobby (Owner)" component={RoomLobbyOwner} />
      <Screen name="Room Lobby (Guest)" component={RoomLobbyGuest} />
      <Screen name="Search" component={Search} />
    </Navigator>
  );
};

export default MainNavigator;
