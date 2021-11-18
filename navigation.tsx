import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import CreateEnterRoom from "./pages/createEnterRoom/CreateEnterRoom";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";

const MainStack = createStackNavigator<TopNavigatorParamsList>();
const MainNavigator: React.FC = () => {
	const { Navigator, Screen } = MainStack;

	return (
		<Navigator headerMode="none" initialRouteName="Splash">
			<Screen name="Splash" component={Splash} />
			<Screen name="Tabs" component={TabNavigator} />
		</Navigator>
	);
};
