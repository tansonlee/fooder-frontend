import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Home = ({ setIsOwner }) => {
	const navigate = useNavigate();
	const handleCreateRoomPress = () => {
		setIsOwner(true);
		navigate("/create-room");
	};
	const handleEnterRoomPress = () => {
		setIsOwner(false);
		navigate("/enter-room");
	};

	return (
		<div>
			{/* <View style={style.header}>
				<Text style={style.title}>Fooder<Typography/>
				<Text style={style.slogan}>Taking the trouble out of deciding where to eat!<Typography/>
			</div> */}
			<Typography variant="h1" gutterBottom component="div">
				Fooder
			</Typography>
			<Typography variant="h4" gutterBottom component="div">
				Taking the trouble out of deciding where to eat!
			</Typography>
			<Typography variant="p" gutterBottom component="div">
				Taking the trouble out of deciding where to eat!
			</Typography>

			{/* <Button title="create a room" onClick={handleCreateRoomPress} /> */}
			<Button variant="contained" onClick={handleCreateRoomPress}>
				Create a Room
			</Button>
			{/* <Button title="enter a room" onClick={handleEnterRoomPress} /> */}
			<Button variant="contained" onClick={handleEnterRoomPress}>
				Enter a Room
			</Button>
		</div>
	);
};

// const style = StyleSheet.create({
// 	header: {
// 		display: "flex",
// 		flexDirection: "column",
// 		height: "30vh",
// 	},
// 	title: {
// 		textAlign: "center",
// 		fontWeight: "bold",
// 		fontSize: 30,
// 	},
// 	slogan: {
// 		textAlign: "center",
// 		fontSize: 16,
// 	},
// });

export default Home;
