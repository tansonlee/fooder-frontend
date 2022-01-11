import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";

import Home from "./pages/home/Home";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";
import RoomLobby from "./pages/roomLobby/RoomLobby";
import Search from "./pages/search/Search";
import Matches from "./pages/matches/Matches";
import About from "./pages/about/About";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const App = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [matchedRestaurants, setMatchedRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<Home setIsOwner={setIsOwner} />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="enter-room" element={<EnterRoom />} />
          <Route
            path="/room-lobby"
            element={
              <RoomLobby
                isOwner={isOwner}
                setAllRestaurants={setAllRestaurants}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                setMatchedRestaurants={setMatchedRestaurants}
                matchedRestaurants={matchedRestaurants}
                allRestaurants={allRestaurants}
              />
            }
          />

          <Route
            path="/matches"
            element={<Matches matchedRestaurants={matchedRestaurants} />}
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
