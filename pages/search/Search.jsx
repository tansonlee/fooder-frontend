import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import socket from "../../socket";
import Restaurant from "./Restaurant";

const Search = ({ navigation }) => {
  // can we abstract this and take the event as a function parameter?
  // eg. handleRoomPress(room) => { navigation.navigate(room)
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantIndex, setRestaurantIndex] = useState(0);
  const [matchedRestaurants, setMatchedRestaurants] = useState([]);

  const acceptRestaurant = () => {
    socket.emit("accept restaurant", restaurants[restaurantIndex].id);
  };

  const swipeNext = (isAccept) => {
    if (restaurantIndex === restaurants.length - 1) {
      setRestaurantIndex(0);
    } else {
      setRestaurantIndex(restaurantIndex + 1);
    }
    if (isAccept) {
      acceptRestaurant();
    }
  };

  let addMatch;

  const owner = true;

  useEffect(() => {
    if (owner) {
      socket.emit("request restaurants", {});
    }
    socket.on("found restaurants", (totalRestaurantList) => {
      console.log("RESTAURANTS HERE");
      //console.log(totalRestaurantList);
      setRestaurants(totalRestaurantList);
    });
  }, []);
  useEffect(() => {
    socket.on("update matches", (newMatchId) => {
      console.log("index", restaurantIndex);
      console.log("new matchId: ", newMatchId, "restau", restaurants.length);
      const newMatch = restaurants.find((restaurant) => {
        console.log(restaurant.id);
        return restaurant.id === newMatchId;
      });
      if (!newMatch) {
        return;
      }
      // console.log(newMatch);
      console.log("ABOUT TO SET");
      setMatchedRestaurants((prev) => {
        console.log("prevl", prev.length);
        const retval = [...prev, newMatch];
        console.log("retvl", retval.length);
        return retval;
      });
    });
  }, [restaurants]);
  return (
    <View>
      {restaurants.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Restaurant {...restaurants[restaurantIndex]} swipeNext={swipeNext} />
          {matchedRestaurants.map((rest, index) => {
            // console.log(index);
            // console.log(rest);
            return <Text key={index}>{rest.name}</Text>;
          })}
        </View>
      )}
    </View>
  );
};

export default Search;
