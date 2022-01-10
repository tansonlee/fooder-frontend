import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EnterRoom = () => {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = async () => {
		navigate("/room-lobby", {
			state: {
				username: username,
				roomId: roomId,
			},
		});
	};

	return (
		<div>
			<Typography variant="h2" gutterBottom component="div">
				Enter room
			</Typography>

			{/* <TextInput
				style={styles.input}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
			/> */}
			<TextField
				id="outlined-basic"
				label="Username"
				variant="username"
				onChangeText={setUsername}
			/>
			{/* <TextInput
				style={styles.input}
				value={roomId}
				onChangeText={setRoomId}
				placeholder="Room ID"
			/> */}
			<TextField
				id="outlined-basic"
				label="Room ID"
				variant="RoomId"
				onChangeText={setRoomId}
			/>

			{/* <Button title="Submit" onClick={handleSubmit} /> */}
			<Button variant="contained" onClick={handleSubmit}>
				Submit
			</Button>
		</div>
	);
};

// const styles = StyleSheet.create({
// 	input: {
// 		height: 40,
// 		margin: 12,
// 		borderWidth: 1,
// 		padding: 10,
// 	},
// });

export default EnterRoom;
