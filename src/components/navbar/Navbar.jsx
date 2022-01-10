import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				backgroundColor: "gray",
			}}
		>
			<h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
				Fooder
			</h2>

			<div>
				<button onClick={() => navigate("/")}>Home</button>
				<button onClick={() => navigate("/about")}>About</button>
			</div>
		</div>
	);
};

export default Navbar;
