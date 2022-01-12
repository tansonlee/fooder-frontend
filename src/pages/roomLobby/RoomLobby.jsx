import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../../socket";

import axios from "axios";
import { api } from "../../env";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import Layout from "../../components/Layout";
import UserList from "../../components/UserList";

const RoomLobby = ({ isOwner, setAllRestaurants }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [loc, setLoc] = useState("");
  const [maxDistance, setMaxDistance] = useState(1000);
  const [prices, setPrices] = useState([1, 2]); // "$" or "$, $$" or "$$$$" etc.. (can be 1, 2, 3, and 4)

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    console.log(
      `emit JOIN_ROOM: username=${location.state.username}, roomId=${location.state.roomId}`
    );
    socket.emit("JOIN_ROOM", {
      username: location.state.username,
      roomId: location.state.roomId,
      isOwner: isOwner,
    });
    socket.on("NEW_ROOM_USERS", ({ users: allUsers }) => {
      console.log(`on NEW_ROOM_USERS: newUsers=${allUsers}`);
      setUsers(allUsers);
      console.log("users: ", allUsers);
    });
    socket.on("FOUND_RESTAURANTS", (totalRestaurantList) => {
      console.log(
        `on FOUND_RESTAURANTS: totalRestaurantList=very long list of restaurants`
      );
      console.log(`going to the Search page`);
      setAllRestaurants(totalRestaurantList);
      navigate("/search");
    });
  }, [setAllRestaurants]);

  useEffect(() => {
    (async () => {
      if (navigator.geolocation) {
        console.log(
          "navigator.geolocation",
          navigator.geolocation.getCurrentPosition
        );
        return navigator.geolocation.getCurrentPosition(async (position) => {
          console.log("position", position);
          const response = await axios.get(
            `${api}/address/${position.coords.latitude},${position.coords.longitude}`
          );

          console.log("address response", response);

          if (response.data.success) {
            setLoc(response.data.address);
          }
        });
      }
    })();
  }, []);

  // convert from km to m
  const formatDistance = (distance) => distance * 1000;

  const formatPrices = (prices) => {
    if (prices[0] == prices[1]) {
      return prices[0];
    } else {
      let priceArray = [];
      for (let i = prices[0]; i <= prices[1]; ++i) {
        priceArray.push(i);
      }
      return priceArray.join(", ");
    }
  };

  const handleNext = () => {
    const location = "Waterloo, Ontario";
    console.log(`owner clicked next`);
    console.log(`emit GET_RESTAURANTS: location=${location}`);
    socket.emit("GET_RESTAURANTS", {
      location: loc,
      radius: formatDistance(maxDistance),
      price: formatPrices(prices),
    });
  };

  // price is 1, 2, 3, or 4
  const togglePrice = (price) => () => {};
  // const togglePrice = (price) => (e) => {
  //   if (prices.split(", ").filter((p) => p.length === price).length > 0) {
  //     console.log("removing price", { price, prices });
  //     setPrices(
  //       prices
  //         .split(", ")
  //         .filter((p) => p.length !== price)
  //         .filter((p) => p.length !== 0) // remove the empty string
  //         .join(", ")
  //     );
  //   } else {
  //     console.log("adding price", { price, prices });
  //     setPrices(
  //       [...prices.split(", "), "$".repeat(price)]
  //         .filter((p) => p.length !== 0) // remove the empty string
  //         .sort((a, b) => a.length - b.length)
  //         .join(", ")
  //     );
  //   }
  // };

  const distanceText = (value) => `${value} km`;
  const distanceMarks = [
    {
      value: 1,
      label: "1 km",
    },
    {
      value: 25,
      label: "25 km",
    },
  ];

  const priceText = (value) => "$".repeat(value);
  const priceMarks = [
    {
      value: 1,
      label: "$",
    },
    {
      value: 2,
      label: "$$",
    },
    {
      value: 3,
      label: "$$$",
    },
    {
      value: 4,
      label: "$$$$",
    },
  ];

  return (
    <Layout>
      <Typography variant="p" gutterBottom component="p">
        Room ID: {location.state.roomId}
      </Typography>
      {/* <Text>Room ID: {location.state.roomId}<Typography/> */}
      {isOwner ? (
        <Typography variant="p" component="p">
          You are the owner
        </Typography>
      ) : null}
      <UserList users={users} myUserId={socket.id} />
      <div>
        <Typography variant="p" component="p">
          Current settings
        </Typography>
        <Typography variant="p" component="p">
          Location: {loc ? loc : "Not set"}
        </Typography>
        <Typography variant="p" component="p">
          Max Distance: {maxDistance ? maxDistance : "Not set"}
        </Typography>
        <Typography variant="p" component="p">
          Prices: {prices.length !== 0 ? formatPrices(prices) : "Not set"}
        </Typography>
      </div>
      {true ? (
        <div>
          {/* <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Edit Settings
          </Button> */}

          {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}> */}
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h4">
              Adjust Settings
            </Typography>
            <Typography variant="h5" component="h5">
              Location:{" "}
            </Typography>
            <Typography component="div">
              <Box sx={{ fontStyle: "italic", m: 1 }}>
                For example: "New York City", "NYC", "350 5th Ave, New York, NY
                10118"
              </Box>
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-name"
              required
              label="Location"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
            <Typography variant="h5" component="h5">
              Max Distance in meters:{" "}
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-name"
              label="Max Distance"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
            />
            <Slider
              aria-label="Max Distance (km)"
              defaultValue={5}
              onChange={handleChange(setMaxDistance)}
              getAriaValueText={distanceText}
              valueLabelFormat={distanceText}
              valueLabelDisplay="auto"
              step={1}
              marks={distanceMarks}
              min={1}
              max={25}
            />
            <Typography variant="h5" component="h5">
              Price Range:
            </Typography>
            <Slider
              getAriaLabel={() => "Price range"}
              value={prices}
              onChange={handleChange(setPrices)}
              getAriaValueText={priceText}
              valueLabelFormat={priceText}
              valueLabelDisplay="auto"
              marks={priceMarks}
              min={1}
              max={4}
              sx={{ color: "secondary" }}
            />
            {/* <Button onClick={() => setOpenDialog(false)}>Save & Close</Button> */}
          </Box>
          {/* </Dialog> */}
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </div>
      ) : (
        <Button variant="contained" disabled>
          Waiting for owner...
        </Button>
      )}
    </Layout>
  );
};

export default RoomLobby;
