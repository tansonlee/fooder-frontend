import React from "react";
import TextField from "@mui/material/TextField";

const Settings = () => {
	return (
		<div>
			<h1>Settings</h1>
			<TextField id="outlined-name" label="Location" value={name} onChange={handleChange} />
		</div>
	);
};

export default Settings;
