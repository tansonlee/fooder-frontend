import React from "react";
import { Text, Image, View } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const Restaurant = (props) => {
  // ADD STYLE FOR SWIPING RIGHT/LEFT

  const onSwipeLeft = (gestureState) => {
    console.log("You swiped left!");
    props.swipeNext();
  };

  const onSwipeRight = (gestureState) => {
    console.log("You swiped right!");
    props.swipeNext();
  };
  // if (!props.name) {
  //   return <View></View>;
  // }
  return (
    <GestureRecognizer
      onSwipeLeft={(state) => onSwipeLeft(state)}
      onSwipeRight={(state) => onSwipeRight(state)}>
      <View>
        <Text>{props.name}</Text>
        <Text>
          Categories:&nbsp;
          {
            props.categories.map((category) => category.title).join(", ")
            // maybe display categories as diff colours?
          }
        </Text>
        <Text>Distance: {props.distance}</Text>
        <Image
          style={{ width: 250, height: 250 }} // worry about css later
          source={{
            uri: props.image_url,
          }}
        />
        <Text>
          Location:
          {/* {props.location.display_address.map(
            (addressComponent) => " " + addressComponent
          )} */}
        </Text>
        <Text>Price: {props.price}</Text>
        <Text>
          {props.rating} ({props.review_count} reviews)
        </Text>
      </View>
    </GestureRecognizer>
  );
};

export default Restaurant;
