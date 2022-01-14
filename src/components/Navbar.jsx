import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logo.png";
import { endpoint } from "../env";

const Navbar = () => {
	const goHome = () => {
		window.location.href = endpoint;
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={goHome}
					>
						<img src={logo} alt="" style={{ width: "40px", height: "40px" }} />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
		// <div
		// 	style={{
		// 		display: "flex",
		// 		flexDirection: "row",
		// 		justifyContent: "space-between",
		// 		backgroundColor: "gray",
		// 	}}
		// >
		// 	<h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
		// 		Fooder
		// 	</h2>

		// 	<div>
		// 		<button onClick={() => navigate("/")}>Home</button>
		// 		<button onClick={() => navigate("/about")}>About</button>
		// 	</div>
		// </div>
	);
};

export default Navbar;
