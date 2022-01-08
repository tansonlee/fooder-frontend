import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";
import Restaurant from "./Restaurant";

const Search = ({ navigation, setMatchedRestaurants, matchedRestaurants, allRestaurants }) => {
	const [restaurantIndex, setRestaurantIndex] = useState(0);

	const acceptRestaurant = () => {
		socket.emit("ACCEPT_RESTAURANT", { restaurantId: allRestaurants[restaurantIndex].id });
	};

	const swipeNext = isAccept => {
		if (restaurantIndex === allRestaurants.length - 1) {
			setRestaurantIndex(0);
		} else {
			setRestaurantIndex(restaurantIndex + 1);
		}
		if (isAccept) {
			acceptRestaurant();
		}
	};

	useEffect(() => {
		socket.on("MATCHES_FOUND", matches => {
			console.log(`on MATCHES_FOUND: matches=${matches}`);
			const matchingRestaurants = allRestaurants.filter(restaurant =>
				matches.includes(restaurant.id)
			);
			console.log(`matchingRestaurants: ${matchingRestaurants.map(e => e.name)}`);
			setMatchedRestaurants(matchingRestaurants);
		});
	}, [allRestaurants]);
	return (
		<View>
			{allRestaurants.length === 0 ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Restaurant {...allRestaurants[restaurantIndex]} swipeNext={swipeNext} />
					{matchedRestaurants.map((rest, index) => {
						return <Text key={index}>{rest.name}</Text>;
					})}
					<Button title="See Matches" onPress={() => navigation.navigate("Matches")} />
				</View>
			)}
		</View>
	);
};

export default Search;
