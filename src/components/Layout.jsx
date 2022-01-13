import React from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import Paper from "@mui/material/Paper";

const Layout = props => {
	const styles = props.extendPaper
		? {
				paperContainer: {
					minHeight: "calc(100vh - 56px)",
					borderRadius: "0%",
				},
		  }
		: {
				paperContainer: {
					//backgroundImage: "url(https://wallpaper.dog/large/5548549.jpg)",
					height: "calc(100vh - 56px)",
					borderRadius: "0%",
				},
		  };

	return (
		<Box>
			<Navbar />
			<Paper style={styles.paperContainer}>{props.children}</Paper>
		</Box>
	);
};

export default Layout;
