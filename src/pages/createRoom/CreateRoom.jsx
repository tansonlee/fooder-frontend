import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../env";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateRoom = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");

	const handleSubmit = async () => {
		console.log("clicked!");
		const endpoint = `${api}/create-room`;
		console.log("ep", endpoint);
		try {
			const result = await axios.post(endpoint, { username: username });
			console.log("username", username, result.data);
			navigate("/room-lobby", { state: { username: username, roomId: result.data.roomId } });
		} catch (e) {
			console.log("error", e);
		}
	};

	return (
		<div>
			<Typography variant="h2" gutterBottom component="div">
				Create room
			</Typography>

			{/* <TextInput style={styles.input} value={username} onChangeText={setUsername} /> */}
			<TextField
				id="outlined-basic"
				label="Username"
				variant="username"
				onChangeText={setUsername}
			/>

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

export default CreateRoom;
