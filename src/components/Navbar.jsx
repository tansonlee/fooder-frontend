import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
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
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Fooder
					</Typography>
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
