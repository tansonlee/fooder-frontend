import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import Restaurant from "./Restaurant";
import Matches from "./Matches";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import UserList from "../../components/UserList";
import Layout from "../../components/Layout";

const Search = ({ setMatchedRestaurants, matchedRestaurants, allRestaurants, roomId }) => {
	const navigate = useNavigate();
	const [restaurantIndex, setRestaurantIndex] = useState(0);

	const acceptRestaurant = () => {
		socket.emit("ACCEPT_RESTAURANT", {
			restaurantId: allRestaurants[restaurantIndex].id,
		});
	};
	const matchesTab = 0;
	const restaurantTab = 12;
	const usersTab = 0;

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
			console.log(`on MATCHES_FOUND: matches=${matches}`);
			const matchingRestaurants = allRestaurants.filter(restaurant =>
				matches.includes(restaurant.id)
			);
			console.log(`matchingRestaurants: ${matchingRestaurants.map(e => e.name)}`);
			setMatchedRestaurants(matchingRestaurants);
		});
	}, [allRestaurants, setMatchedRestaurants]);

	return (
		<Layout>
			{allRestaurants.length === 0 ? (
				<Typography variant="p" component="div">
					Loading...
				</Typography>
			) : (
				<Grid container spacing={0} sx={{ p: 4 }}>
					<Grid item sm={matchesTab} md={4}>
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
					<Grid item sm={restaurantTab} md={4}>
						<Restaurant {...allRestaurants[restaurantIndex]} swipeNext={swipeNext} />
					</Grid>
					<Grid item sm={usersTab} md={4}>
						<UserList users={["placeholder1", "placeholder2"]} />
					</Grid>
				</Grid>
			)}
		</Layout>
	);
};

export default Search;
