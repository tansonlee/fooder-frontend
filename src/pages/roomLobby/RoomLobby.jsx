import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import socket from "../../socket";

import axios from "axios";
import { api } from "../../env";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormHelperText } from "@mui/material";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";

import Layout from "../../components/Layout";
import UserList from "../../components/UserList";
import ClipboardCopy from "../../components/ClipboardCopy";

const RoomLobby = ({
  isOwner,
  setAllRestaurants,
  roomId,
  setAppUsers,
  setIsOwner,
  socket,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [locationEdited, setLocationEdited] = useState(false);

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

    socket.emit("JOIN_ROOM", {
      username: location.state.username,
      roomId: location.state.roomId,
      isOwner: isOwner,
    });
  }, [isOwner, location.state, navigate, socket]);

  useEffect(() => {
    if (!location.state || !location.state.roomId || !location.state.roomId) {
      navigate("/");
      return;
    }
    socket.on("connect", () => {
      console.log("lobby connect");
      if (isOwner) {
        socket.emit("RECONNECTING_ROOM", location.state);
      }
      socket.emit("JOIN_ROOM", {
        username: location.state.username,
        roomId: location.state.roomId,
        isOwner: isOwner,
      });
      // if (location.pathname === "/room-lobby") {
      //   console.log("about to emit", location.state);
      //   socket.emit("RECONNECTING_ROOM", location.state);
      // }
    });

    socket.on("NEW_ROOM_USERS", ({ users: allUsers }) => {
      setUsers(allUsers);
      setAppUsers(allUsers);
      // check if a new owner is assigned to be me
      const myUserData = allUsers.find(
        (user) => user.userId === location.state.userId
      );
      if (myUserData && myUserData.isOwner) {
        setIsOwner(true);
      }
    });
    socket.on("FOUND_RESTAURANTS", (data) => {
      setIsLoading(false);
      if (data.success) {
        setAllRestaurants(data.restaurants);
        navigate("/search", {
          users: users,
        });
      } else {
        setLocationError(true);
      }
    });
  }, [
    setAllRestaurants,
    isOwner,
    location.state?.roomId,
    location.state?.username,
    navigate,
    location.state,
    location.pathname,
    setAppUsers,
    setIsOwner,
    users,
    socket,
  ]);

  useEffect(() => {
    if (!roomId || roomId.length !== 6) {
      navigate("/");
      return;
    }
    if (navigator.geolocation && isOwner) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await axios.get(
          `${api}/address/${position.coords.latitude},${position.coords.longitude}`
        );

        if (response.data.success && !locationEdited) {
          setLoc(response.data.address);
        }
      });
    }
  }, [navigate, roomId, locationEdited, isOwner]);

  // convert from km to m
  const formatDistance = (distance) => distance * 1000;

  const formatPrices = (prices) => {
    if (prices[0] === prices[1]) {
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
            Room Lobby
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="p"
            sx={{ mt: 2, textAlign: "center" }}>
            Send your friends the following Room ID
          </Typography>
          <ClipboardCopy copyText={location.state?.roomId} />
          <Box>
            <UserList users={users} myUserId={socket.id} />
          </Box>
          {isOwner ? (
            <Box>
              <Box>
                <Typography variant="h6" component="h6" sx={{ mt: 2 }}>
                  Search Settings
                </Typography>
                <Box sx={{ p: 1 }}>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-name"
                    required
                    label="Location"
                    value={loc}
                    onChange={(e) => {
                      setLoc(e.target.value);
                      setLocationError(false);
                      setLocationEdited(true);
                    }}
                    color="secondary"
                    error={locationError}
                  />
                  <FormHelperText sx={{ pl: 1 }} id="component-helper-text">
                    {locationError
                      ? "Invalid location"
                      : `"Waterloo, ON",
											"Toronto",
											"M5B 2H1"`}
                  </FormHelperText>
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" component="h5">
                    Max Distance
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
                    color="secondary"
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" component="h5">
                    Price Range
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
                    color="secondary"
                  />
                </Box>
              </Box>
              <Box textAlign="center" sx={{ m: 4 }}>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  size="large"
                  onClick={handleNext}>
                  Start
                </LoadingButton>
              </Box>
            </Box>
          ) : (
            <Box textAlign="center" sx={{ m: 4 }}>
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
