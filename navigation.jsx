import * as React from "react";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEnterRoom from "./pages/createEnterRoom/CreateEnterRoom";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";
import RoomLobby from "./pages/roomLobby/RoomLobby";
import Search from "./pages/search/Search";
import Matches from "./pages/matches/Matches";

const MainStack = createNativeStackNavigator();
const MainNavigator = () => {
	const { Navigator, Screen } = MainStack;
	const [isOwner, setIsOwner] = useState(false);
	const [matchedRestaurants, setMatchedRestaurants] = useState([]);
	const [allRestaurants, setAllRestaurants] = useState([]);

	return (
		<Navigator>
			<Screen
				name="Home"
				children={props => <CreateEnterRoom setIsOwner={setIsOwner} {...props} />}
			/>
			<Screen name="Create Room" children={props => <CreateRoom {...props} />} />
			<Screen name="Enter Room" children={props => <EnterRoom {...props} />} />
			<Screen
				name="Room Lobby"
				children={props => (
					<RoomLobby isOwner={isOwner} setAllRestaurants={setAllRestaurants} {...props} />
				)}
			/>
			<Screen
				name="Search"
				children={props => (
					<Search
						setMatchedRestaurants={setMatchedRestaurants}
						matchedRestaurants={matchedRestaurants}
						allRestaurants={allRestaurants}
						{...props}
					/>
				)}
			/>

			<Screen
				name="Matches"
				children={props => <Matches matchedRestaurants={matchedRestaurants} {...props} />}
			/>

			{/* <Screen name="Home" component={CreateEnterRoom} initialParams={{ setIsOwner }} />
			<Screen name="Create Room" component={CreateRoom} />
			<Screen name="Enter Room" component={EnterRoom} />
			<Screen
				name="Room Lobby"
				component={RoomLobby}
				initialParams={{ isOwner, setAllRestaurants }}
			/>
			<Screen
				name="Search"
				component={Search}
				initialParams={{ setMatchedRestaurants, matchedRestaurants, allRestaurants }}
			/>
			<Screen name="Matches" component={Matches} initialParams={{ matchedRestaurants }} /> */}
		</Navigator>
	);
};

export default MainNavigator;
