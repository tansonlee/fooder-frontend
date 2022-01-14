import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Layout from "../../components/Layout";

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
		<Layout>
			<Stack direction="row" justifyContent="center" alignItems="center" height="100%">
				<Box
					sx={{
						//backgroundColor: "#DC405C",
						borderRadius: "2%",
						p: 3,
						mt: -4,
					}}
				>
					<Typography align="center" variant="h3" sx={{ mt: 4 }} component="h3">
						Fooder
					</Typography>
					<Typography
						variant="h5"
						align="center"
						sx={{ p: 2 }}
						gutterBottom
						component="h5"
					>
						Taking the trouble out of deciding where to eat!
					</Typography>
					<Grid container justifyContent="center">
						<Button
							variant="contained"
							sx={{ m: 2, mt: 0 }}
							onClick={handleCreateRoomPress}
						>
							Create a Room
						</Button>
						<Button
							variant="contained"
							color="secondary"
							sx={{ m: 2, mt: 0 }}
							onClick={handleEnterRoomPress}
						>
							Enter a Room
						</Button>
					</Grid>
				</Box>
			</Stack>
		</Layout>
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
