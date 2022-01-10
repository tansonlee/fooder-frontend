import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Home = ({ navigation, setIsOwner }) => {
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
			<View style={style.header}>
				<Text style={style.title}>Fooder</Text>
				<Text style={style.slogan}>Taking the trouble out of deciding where to eat!</Text>
			</View>
			<Text>create or enter a room!</Text>
			<Button title="create a room" onPress={handleCreateRoomPress} />
			<Button title="enter a room" onPress={handleEnterRoomPress} />
		</View>
	);
};

const style = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "column",
		height: "30vh",
	},
	title: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 30,
	},
	slogan: {
		textAlign: "center",
		fontSize: 16,
	},
});

export default Home;
