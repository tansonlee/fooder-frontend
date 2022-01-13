import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const Restaurant = (props) => {
  // ADD STYLE FOR SWIPING RIGHT/LEFT

  const reformatDistance = (distance) => {
    const kmValue = Math.round(distance / 100) / 10;
    return kmValue + " km";
  };

  return (
    <Box textAlign="center">
      <Typography variant="h4" component="h6">
        {props.name}
      </Typography>
      <Typography variant="subtitle1" component="h1" color="text.secondary">
        Categories:&nbsp;
        {
          props.categories.map((category) => category.title).join(", ")
          // maybe display categories as diff colours?
        }
      </Typography>
      <Box sx={{ p: 2 }}>
        <img
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
            maxWidth: "100%",
          }}
          src={props.image_url}
          alt={props.name}
        />
      </Box>
      <Typography variant="subtitle1" component="div" color="text.secondary">
        {props.location.display_address.map(
          (addressComponent) => " " + addressComponent
        )}
      </Typography>
      <Typography variant="h6" component="div">
        Distance: {reformatDistance(props.distance)}
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ p: 1, pl: 6, pr: 6 }}>
        <Grid item xs={4} align="end">
          <Typography variant="subtitle1" component="div">
            Price: {props.price}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Rating value={props.rating} precision={0.2} readOnly />
          <Typography align="center" variant="body2" component="div">
            ({props.review_count.toLocaleString()} reviews)
          </Typography>
        </Grid>
      </Grid>
      <Link
        variant="subtitle2"
        href={props.url}
        underline="hover"
        target="_blank"
        rel="noopener">
        View on Yelp
      </Link>
    </Box>
  );
};

export default Restaurant;
