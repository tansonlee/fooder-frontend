import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../env";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Layout from "../../components/Layout";
import Stack from "@mui/material/Stack";
import { FormHelperText } from "@mui/material";

const CreateRoom = ({ setRoomId }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const handleChange = setValue => event => {
		setValue(event.target.value);
		setUsernameError(false);
	};

	const handleSubmit = async () => {
		if (username.length < 1) {
			setUsernameError(true);
			return;
		}
		const endpoint = `${api}/create-room`;
		try {
			const result = await axios.post(endpoint, { username: username });
			setRoomId(result.data.roomId);
			navigate("/room-lobby", {
				state: {
					username: username,
					roomId: result.data.roomId,
					userId: result.data.userId,
				},
			});
		} catch (e) {
			console.error("error", e);
		}
	};

	return (
		<Layout>
			<Stack direction="row" justifyContent="center" alignItems="center" height="100%">
				<Box
					sx={{
						borderRadius: "2%",
						p: 3,
						mt: "-5vw",
					}}
					textAlign="center"
				>
					<Typography variant="h3" gutterBottom component="h3">
						Create a Room
					</Typography>
					<Box>
						{/* <TextInput style={styles.input} value={username} onChangeText={setUsername} /> */}
						<TextField
							id="outlined-basic"
							label="Name"
							variant="outlined"
							value={username}
							onChange={handleChange(setUsername)}
							fullWidth
							error={usernameError}
							// onChangeText={setUsername}
						/>
						<FormHelperText sx={{ pl: 2 }} id="component-helper-text">
							{usernameError
								? "Name cannot be empty"
								: "This will be displayed to others in your room"}
						</FormHelperText>

						<Button
							variant="contained"
							align="center"
							sx={{ m: 3 }}
							onClick={handleSubmit}
						>
							Create
						</Button>
					</Box>
				</Box>
			</Stack>
		</Layout>
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
