import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";

const Search = ({ navigation }) => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)
  const [restaurants, setRestaurants] = useState([]);

  const owner = true;
  useEffect(() => {
    if (owner) {
      socket.emit("request restaurants", {});
    }

    socket.on("found restaurants", (totalRestaurantList) => {
      console.log("RESTAURANTS HERE");
      setRestaurants(totalRestaurantList);
    });
    socket.on("update matches", (newMatch) => {
      console.log("new user", newMatch);
      setRestaurants((prev) => [...prev, newMatch]);
    });
  }, []);

  return (
    <View>
      {restaurants.map((restaurant, i) => {
        if (i == 0) {
          console.log("NEW RESTAURANT", restaurant);
        }

        /*
        KEY NEEDS TO BE FIXED (restaurantID?)
        */
        return <Text key={i}>{restaurant.name}</Text>;
      })}
    </View>
  );
};

export default Search;
