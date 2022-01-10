import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import Restaurant from "./Restaurant";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Search = ({ setMatchedRestaurants, matchedRestaurants, allRestaurants }) => {
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
		<div>
			{allRestaurants.length === 0 ? (
				<Typography variant="p" component="div">
					Loading...
				</Typography>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={matchesTab} md={4}>
						<Typography variant="h2" component="h2">
							Matches
						</Typography>
						{matchedRestaurants.map((rest, index) => {
							return (
								<div>
									<Typography variant="p" component="p" key={index}>
										{rest.name}
									</Typography>
								</div>
							);
						})}
					</Grid>
					<Grid item xs={restaurantTab} md={4}>
						<Restaurant {...allRestaurants[restaurantIndex]} swipeNext={swipeNext} />
					</Grid>
					<Grid item xs={usersTab} md={4}>
						xs=6 md=4
					</Grid>
				</Grid>
			)}
		</div>
	);
	{
		/* //   <Restaurant
		    //     {...allRestaurants[restaurantIndex]}
		    //     swipeNext={swipeNext}
		    //   />
		//       {matchedRestaurants.map((rest, index) => {
		//         return (
		//           <Typography variant="p" component="div" key={index}>
		//             {rest.name}
		//           </Typography>
		//         );
		//       })}
		//       <Button variant="contained" onClick={() => navigate("/matches")}>
		//         See Matches
		//       </Button>
		//     </div>
		//   )}
		// </div> */
	}
};

export default Search;
