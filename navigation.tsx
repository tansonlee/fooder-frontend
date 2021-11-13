import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import CreateEnterRoom from "./pages/createEnterRoom/CreateEnterRoom";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";

const screens = {
	CreateEnterRoom: {
		screen: CreateEnterRoom,
	},
	CreateRoom: {
		screen: CreateRoom,
	},
	EnterRoom: {
		screen: EnterRoom,
	},
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
