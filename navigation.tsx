import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import CreateEnterRoom from "./pages/createEnterRoom/CreateEnterRoom";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";

const MainStack = createNativeStackNavigator<TopNavigatorParamsList>();
const MainNavigator: React.FC = () => {
  const { Navigator, Screen } = MainStack;

  return (
    <Navigator>
      <Screen name="Home" component={CreateEnterRoom} />
      <Screen name="Create Room" component={CreateRoom} />
      <Screen name="Enter Room" component={EnterRoom} />
    </Navigator>
  );
};

export default MainNavigator;
