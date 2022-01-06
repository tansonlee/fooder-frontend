import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";
import Restaurant from "./Restaurant";

const Search = ({ navigation }) => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantIndex, setRestaurantIndex] = useState(0);

  const swipeNext = () => {
    if (restaurantIndex === restaurants.length - 1) {
      setRestaurantIndex(0);
    } else {
      setRestaurantIndex(restaurantIndex + 1);
    }
  };

  const owner = true;
  useEffect(() => {
    if (owner) {
      socket.emit("request restaurants", {});
    }

    socket.on("found restaurants", (totalRestaurantList) => {
      console.log("RESTAURANTS HERE");
      console.log(totalRestaurantList);
      setRestaurants(totalRestaurantList);
    });
    socket.on("update matches", (newMatch) => {
      console.log("new user", newMatch);
      setRestaurants((prev) => [...prev, newMatch]);
    });
  }, []);
  return (
    <View>
      {restaurants.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <Restaurant {...restaurants[restaurantIndex]} swipeNext={swipeNext} />
      )}
    </View>
  );
};

export default Search;
