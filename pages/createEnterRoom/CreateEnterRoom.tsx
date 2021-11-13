import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

type Props = {
	navigation: any;
};

const CreateEnterRoom = (props): Props => {
	const handleCreateRoomPress = () => {
		navigation.navigate("CreateRoom");
	};

	return (
		<View>
			<Text>CreateEnterRoom</Text>
			<Button title="create a room" onPress={handleCreateRoomPress} />
		</View>
	);
};

export default CreateEnterRoom;
