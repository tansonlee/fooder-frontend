import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import socket from "../../socket";
import Restaurant from "./Restaurant";
import Matches from "./Matches";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserList from "../../components/UserList";
import Layout from "../../components/Layout";
import BottomNavbar from "../../components/BottomNavbar";
import Snackbar from "../../components/Snackbar";
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
	socket,
}) => {
	const navigate = useNavigate();

	const [tab, setTab] = useState(RESTAURANTS_TAB);
	const [open, setOpen] = useState(false);
	const [restaurantIndex, setRestaurantIndex] = useState(0);

	const acceptRestaurant = () => {
		socket.emit("ACCEPT_RESTAURANT", {
			restaurantId: allRestaurants[restaurantIndex].id,
		});
	};

	const canDisplay = displayTab => {
		if (displayTab === tab) {
			return "block";
		} else {
			return "none";
		}
	};

	const swipeNext = isAccept => {
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
		socket.on("MATCHES_FOUND", matches => {
			const matchingRestaurants = allRestaurants.filter(restaurant =>
				matches.includes(restaurant.id)
			);
			setMatchedRestaurants(matchingRestaurants);
			setOpen(true);
		});
	}, [allRestaurants, setMatchedRestaurants, navigate, roomId, socket]);

	return (
		<Layout extendPaper={true}>
			{allRestaurants.length === 0 ? (
				<Typography variant="p" component="div">
					Loading...
				</Typography>
			) : (
				<Grid container spacing={0} sx={{ p: 4, textAlign: "center", pb: 16 }}>
					<Grid
						item
						sm={12}
						md={4}
						sx={{
							display: {
								xs: canDisplay(MATCHES_TAB),
								md: "block",
							},
						}}
					>
						<Matches matchedRestaurants={matchedRestaurants} />
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
							margin: "0 auto",
						}}
					>
						<Restaurant {...allRestaurants[restaurantIndex]} swipeNext={swipeNext} />
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<IconButton
								sx={{
									backgroundColor: "error.light",
									"&:hover": {
										backgroundColor: "error.main",
									},
									width: "5rem",
									height: "5rem",
									position: {
										xs: "fixed",
										md: "relative",
									},
									bottom: {
										xs: 100,
										md: 0,
									},
									left: {
										xs: 40,
										md: 0,
									},
									opacity: {
										xs: 0.85,
										md: 1,
									},
								}}
								variant="contained"
								onClick={() => {
									swipeNext(false);
								}}
							>
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
									position: {
										xs: "fixed",
										md: "relative",
									},
									bottom: {
										xs: 100,
										md: 0,
									},
									right: {
										xs: 40,
										md: 0,
									},
									opacity: {
										xs: 0.85,
										md: 1,
									},
								}}
								variant="contained"
								onClick={() => {
									swipeNext(true);
								}}
							>
								<CheckIcon
									sx={{
										fontSize: "2.5rem",
									}}
								/>
							</IconButton>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							pl: {
								xs: 0,
								md: 8,
							},
							pr: {
								xs: 0,
								md: 8,
							},
							display: {
								xs: canDisplay(USERS_TAB),
								md: "block",
							},
						}}
						align="center"
					>
						<UserList users={users} myUserId={socket.id} />
					</Grid>
				</Grid>
			)}
			<Snackbar
				open={open}
				setOpen={setOpen}
				openMatches={() => {
					setTab(MATCHES_TAB);
				}}
			/>
			<BottomNavbar tab={tab} setTab={setTab} />
		</Layout>
	);
};

export default Search;
