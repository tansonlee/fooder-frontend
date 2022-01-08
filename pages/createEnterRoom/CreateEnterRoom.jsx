import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const CreateEnterRoom = ({ navigation, setIsOwner }) => {
	const handleCreateRoomPress = () => {
		setIsOwner(true);
		navigation.navigate("Create Room");
	};
	const handleEnterRoomPress = () => {
		setIsOwner(false);
		navigation.navigate("Enter Room");
	};

	return (
		<View>
			<Text>create or enter a room!</Text>
			<Button title="create a room" onPress={handleCreateRoomPress} />
			<Button title="enter a room" onPress={handleEnterRoomPress} />
		</View>
	);
};

export default CreateEnterRoom;
