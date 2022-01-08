import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Matches = ({ navigation, matchedRestaurants }) => {
	return (
		<View>
			<Text>Matches</Text>
			<Text>{matchedRestaurants.length}</Text>
			{matchedRestaurants.map((restaurant, index) => {
				return <Text key={index}>{restaurant.name}</Text>;
			})}
			<Button
				title="Back to Search"
				onPress={() => {
					navigation.navigate("Search");
				}}
			/>
		</View>
	);
};

export default Matches;
