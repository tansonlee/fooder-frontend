import * as React from "react";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/home/Home";
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
			<Screen name="Home" children={props => <Home setIsOwner={setIsOwner} {...props} />} />
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
		</Navigator>
	);
};

export default MainNavigator;
