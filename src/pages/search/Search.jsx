import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import Restaurant from "./Restaurant";
import Matches from "./Matches";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserList from "../../components/UserList";
import Layout from "../../components/Layout";
import BottomNavbar from "../../components/BottomNavbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

const MATCHES_TAB = 0;
const RESTAURANTS_TAB = 1;
const USERS_TAB = 2;

const Search = ({
  setMatchedRestaurants,
  matchedRestaurants,
  allRestaurants,
  roomId,
  users,
}) => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(RESTAURANTS_TAB);
  const [restaurantIndex, setRestaurantIndex] = useState(0);

  const acceptRestaurant = () => {
    socket.emit("ACCEPT_RESTAURANT", {
      restaurantId: allRestaurants[restaurantIndex].id,
    });
  };

  const canDisplay = (displayTab) => {
    if (displayTab === tab) {
      return "block";
    } else {
      return "none";
    }
  };

  const swipeNext = (isAccept) => {
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
    if (!roomId || roomId.length !== 6) {
      navigate("/");
    }
    socket.on("MATCHES_FOUND", (matches) => {
      console.log(`on MATCHES_FOUND: matches=${matches}`);
      const matchingRestaurants = allRestaurants.filter((restaurant) =>
        matches.includes(restaurant.id)
      );
      console.log(
        `matchingRestaurants: ${matchingRestaurants.map((e) => e.name)}`
      );
      setMatchedRestaurants(matchingRestaurants);
    });
  }, [allRestaurants, setMatchedRestaurants, navigate, roomId]);

  return (
    <Layout extendPaper={true}>
      {allRestaurants.length === 0 ? (
        <Typography variant="p" component="div">
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={0} sx={{ p: 4 }}>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              display: {
                xs: canDisplay(MATCHES_TAB),
                md: "block",
              },
            }}>
            <Matches matchedRestaurants={matchedRestaurants} />
            {/* {matchedRestaurants.map((rest, index) => {
              return (
                <div>
                  <Typography variant="p" component="p" key={index}>
                    {rest.name}
                  </Typography>
                </div>
              );
            })} */}
          </Grid>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              display: {
                xs: canDisplay(RESTAURANTS_TAB),
                md: "block",
              },
            }}>
            <Restaurant
              {...allRestaurants[restaurantIndex]}
              swipeNext={swipeNext}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}>
              <IconButton
                sx={{
                  backgroundColor: "error.light",
                  "&:hover": {
                    backgroundColor: "error.main",
                  },
                  width: "5rem",
                  height: "5rem",
                }}
                variant="contained"
                onClick={() => {
                  swipeNext(false);
                }}>
                <CloseIcon sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <IconButton
                size="large"
                sx={{
                  backgroundColor: "success.main",
                  "&:hover": {
                    backgroundColor: "success.dark",
                  },
                  width: "5rem",
                  height: "5rem",
                }}
                variant="contained"
                onClick={() => {
                  swipeNext(true);
                }}>
                <CheckIcon sx={{ fontSize: "2.5rem" }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              pl: 8,
              pr: 8,
              display: {
                xs: canDisplay(USERS_TAB),
                md: "block",
              },
            }}
            align="center">
            <UserList users={users} />
          </Grid>
        </Grid>
      )}
      <BottomNavbar tab={tab} setTab={setTab} />
    </Layout>
  );
};

export default Search;
