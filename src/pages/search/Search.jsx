import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import Restaurant from "./Restaurant";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Search = ({ setMatchedRestaurants, matchedRestaurants, allRestaurants }) => {
	const navigate = useNavigate();
	const [restaurantIndex, setRestaurantIndex] = useState(0);

	const acceptRestaurant = () => {
		socket.emit("ACCEPT_RESTAURANT", { restaurantId: allRestaurants[restaurantIndex].id });
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
		socket.on("MATCHES_FOUND", matches => {
			console.log(`on MATCHES_FOUND: matches=${matches}`);
			const matchingRestaurants = allRestaurants.filter(restaurant =>
				matches.includes(restaurant.id)
			);
			console.log(`matchingRestaurants: ${matchingRestaurants.map(e => e.name)}`);
			setMatchedRestaurants(matchingRestaurants);
		});
	}, [allRestaurants]);
	return (
		<div>
			{allRestaurants.length === 0 ? (
				<Typography variant="p" component="div">
					Loading...
				</Typography>
			) : (
				<div>
					<Restaurant {...allRestaurants[restaurantIndex]} swipeNext={swipeNext} />
					{matchedRestaurants.map((rest, index) => {
						return (
							<Typography variant="p" component="div" key={index}>
								{rest.name}
							</Typography>
						);
					})}
					<Button variant="contained" onClick={() => navigate("/matches")}>
						See Matches
					</Button>
				</div>
			)}
		</div>
	);
};

export default Search;
