import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Matches = ({ matchedRestaurants }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Typography variant="h1" gutterBottom component="div">
				Matches
			</Typography>
			<Typography variant="p" gutterBottom component="div">
				{matchedRestaurants.length}
			</Typography>
			{/* <Text>{matchedRestaurants.length}<Typography/> */}
			{matchedRestaurants.map((restaurant, index) => {
				// return <Text key={index}>{restaurant.name}<Typography/>;
				return (
					<Typography variant="h2" component="div" key={index}>
						{restaurant.name}
					</Typography>
				);
			})}
			<Button
				variant="contained"
				onClick={() => {
					navigate("/search");
				}}
			>
				Back to Search
			</Button>
			{/* <Button
				title="Back to Search"
				onClick={() => {
					navigate("/search");
				}}
			/> */}
		</div>
	);
};

export default Matches;
