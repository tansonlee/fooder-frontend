import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../../socket";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const RoomLobby = ({ isOwner, setAllRestaurants }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(
      `emit JOIN_ROOM: username=${location.state.username}, roomId=${location.state.roomId}`
    );
    socket.emit("JOIN_ROOM", {
      // username: route.params.username,
      // roomId: route.params.roomId,
      username: location.state.username,
      roomId: location.state.roomId,
    });
    socket.on("NEW_ROOM_USERS", (newUsers) => {
      console.log(`on NEW_ROOM_USERS: newUsers=${newUsers}`);
      setUsers(newUsers);
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

  const handleNext = () => {
    const location = "Waterloo, Ontario";
    console.log(`owner clicked next`);
    console.log(`emit GET_RESTAURANTS: location=${location}`);
    socket.emit("GET_RESTAURANTS", { location });
  };

  return (
    <div>
      <Typography variant="p" gutterBottom component="p">
        Room ID: {location.state.roomId}
      </Typography>
      {/* <Text>Room ID: {location.state.roomId}<Typography/> */}
      {isOwner ? (
        <Typography variant="p" component="p">
          You are the owner
        </Typography>
      ) : null}
      {users.map((user, i) => {
        console.log("NEW USER", user);
        return (
          <Typography variant="p" component="p" key={i}>
            {user}
          </Typography>
        );
      })}
      {isOwner ? (
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      ) : null}
    </div>
  );
};

export default RoomLobby;
