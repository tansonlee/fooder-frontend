import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";

import Home from "./pages/home/Home";
import CreateRoom from "./pages/createRoom/CreateRoom";
import EnterRoom from "./pages/enterRoom/EnterRoom";
import RoomLobby from "./pages/roomLobby/RoomLobby";
import Search from "./pages/search/Search";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import io from "socket.io-client";
import { api } from "./env.js";

const App = () => {
	const [isOwner, setIsOwner] = useState(false);
	const [matchedRestaurants, setMatchedRestaurants] = useState([]);
	const [allRestaurants, setAllRestaurants] = useState([]);
	const [roomId, setRoomId] = useState(null);
	const [appUsers, setAppUsers] = useState([]);
	const [socket, setSocket] = useState(null);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			background: {
				paper: "#0D1C2D",
			},
		},
	});

	useEffect(() => {
		const socket = io(`${api}`, {
			reconnection: true,
			reconnectionDelay: 20000,
			maxReconnectionAttempts: 120,
		});
		setSocket(socket);
	}, []);

	return (
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<Routes>
					<Route path="/" element={<Home setIsOwner={setIsOwner} />} />
					<Route path="/create-room" element={<CreateRoom setRoomId={setRoomId} />} />
					<Route
						path="/enter-room"
						element={<EnterRoom setRoomId={setRoomId} socket={socket} />}
					/>
					<Route
						path="/room-lobby"
						element={
							<RoomLobby
								isOwner={isOwner}
								setIsOwner={setIsOwner}
								setAllRestaurants={setAllRestaurants}
								roomId={roomId}
								setAppUsers={setAppUsers}
								socket={socket}
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
								roomId={roomId}
								users={appUsers}
								socket={socket}
							/>
						}
					/>

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
