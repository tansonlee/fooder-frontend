import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Restaurant = (props) => {
  // ADD STYLE FOR SWIPING RIGHT/LEFT

  const onSwipeLeft = () => {
    console.log("You swiped left!");
    props.swipeNext(true);
  };

  const onSwipeRight = () => {
    console.log("You swiped right!");
    props.swipeNext(false);
  };

  return (
    <div>
      <Typography variant="p" component="div">
        {props.name}
      </Typography>
      <Typography variant="p" component="div">
        Categories:&nbsp;
        {
          props.categories.map((category) => category.title).join(", ")
          // maybe display categories as diff colours?
        }
      </Typography>
      <Typography variant="p" component="div">
        Distance: {props.distance}
      </Typography>
      <img
        style={{ width: 250, height: 250 }} // worry about css later
        source={{
          uri: props.image_url,
        }}
        alt={props.name}
      />
      <Typography variant="p" component="div">
        Location:
        {props.location.display_address.map(
          (addressComponent) => " " + addressComponent
        )}
      </Typography>
      <Typography variant="p" component="div">
        Price: {props.price}
      </Typography>
      <Typography variant="p" component="div">
        {props.rating} ({props.review_count} reviews)
      </Typography>
      <Typography variant="p" component="div">
        View on Yelp: {props.url}
      </Typography>
      <Button variant="contained" onClick={onSwipeLeft}>
        Left
      </Button>
      <Button variant="contained" onClick={onSwipeRight}>
        Right
      </Button>
    </div>
  );
};

export default Restaurant;
