import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";

const RoomLobby = ({ route, navigation, isOwner, setAllRestaurants }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		console.log(
			`emit JOIN_ROOM: username=${route.params.username}, roomId=${route.params.roomId}`
		);
		socket.emit("JOIN_ROOM", {
			username: route.params.username,
			roomId: route.params.roomId,
		});
		socket.on("NEW_ROOM_USERS", newUsers => {
			console.log(`on NEW_ROOM_USERS: newUsers=${newUsers}`);
			setUsers(newUsers);
		});
		socket.on("FOUND_RESTAURANTS", totalRestaurantList => {
			console.log(`on FOUND_RESTAURANTS: totalRestaurantList=very long list of restaurants`);
			console.log(`going to the Search page`);
			setAllRestaurants(totalRestaurantList);
			navigation.navigate("Search");
		});
	}, []);

	const handleNext = () => {
		const location = "Waterloo, Ontario";
		console.log(`owner clicked next`);
		console.log(`emit GET_RESTAURANTS: location=${location}`);
		socket.emit("GET_RESTAURANTS", { location });
	};

	return (
		<View>
			<Text>Room ID: {route.params.roomId}</Text>
			{isOwner ? <Text>You are the owner</Text> : null}
			{users.map((user, i) => {
				console.log("NEW USER", user);
				return <Text key={i}>{user}</Text>;
			})}
			{isOwner ? <Button title="Next" onPress={handleNext} /> : null}
		</View>
	);
};

export default RoomLobby;
