import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../../socket";

import axios from "axios";
import { api } from "../../env";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormHelperText } from "@mui/material";
import Stack from "@mui/material/Stack";

import Layout from "../../components/Layout";
import UserList from "../../components/UserList";
import ClipboardCopy from "../../components/ClipboardCopy";

const RoomLobby = ({ isOwner, setAllRestaurants, roomId, setAppUsers }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [loc, setLoc] = useState("");
  const [maxDistance, setMaxDistance] = useState(5);
  const [prices, setPrices] = useState([1, 2]); // "$" or "$, $$" or "$$$$" etc.. (can be 1, 2, 3, and 4)

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (!location.state || !location.state.roomId) {
      navigate("/");
      return;
    }
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
      setAppUsers(allUsers);
      // check if a new owner is assigned to be me
      const myUserData = allUsers.find(
        (user) => user.userId === location.state.userId
      );
      if (myUserData && myUserData.isOwner) {
        setIsOwner(true);
      }
      console.log("users: ", allUsers);
    });
    socket.on("FOUND_RESTAURANTS", (totalRestaurantList) => {
      console.log(
        `on FOUND_RESTAURANTS: totalRestaurantList=very long list of restaurants`
      );
      console.log(`going to the Search page`);
      setAllRestaurants(totalRestaurantList);
      setIsLoading(false);
      navigate("/search", {
        users: users,
      });
    });
  }, [
    setAllRestaurants,
    isOwner,
    location.state?.roomId,
    location.state?.username,
    navigate,
  ]);

  useEffect(() => {
    if (!roomId || roomId.length !== 6) {
      navigate("/");
      return;
    }
    if (!navigator.geolocation) return;

    return navigator.geolocation.getCurrentPosition(async (position) => {
      const response = await axios.get(
        `${api}/address/${position.coords.latitude},${position.coords.longitude}`
      );

      if (response.data.success) {
        setLoc(response.data.address);
      }
    });
  }, [navigate, roomId]);

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
    setIsLoading(true);
  };

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
    <Layout extendPaper={true}>
      <Stack direction="row" justifyContent="center" height="100%">
        <Box
          sx={{
            borderRadius: "2%",
            minWidth: "33%",
          }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: "3rem", marginTop: "1rem", textAlign: "center" }}>
            Fooder Lobby
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="p"
            sx={{ mt: 2, textAlign: "center" }}>
            Send your friends the following Room ID
          </Typography>
          <ClipboardCopy copyText={location.state?.roomId} />
          <UserList users={users} myUserId={socket.id} />
          {isOwner ? (
            <Box>
              <Box sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 2 }}>
                  Search Settings
                </Typography>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" component="h5" sx={{ mb: 1 }}>
                    Location
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-name"
                    required
                    label="Location"
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                  />
                  <FormHelperText sx={{ pl: 1 }} id="component-helper-text">
                    "Waterloo, ON", "Toronto", "M5B 2H1"
                  </FormHelperText>
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" component="h5">
                    Max Distance in meters:{" "}
                  </Typography>

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
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" component="h5">
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
                </Box>
              </Box>
              <Button
                variant="contained"
                // loading={isLoading}
                onClick={handleNext}>
                Next
              </Button>
            </Box>
          ) : (
            <Box>
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
              <Button variant="contained" disabled>
                Waiting for owner...
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Layout>
  );
};

export default RoomLobby;
