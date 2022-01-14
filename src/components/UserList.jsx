import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";
import { ListSubheader } from "@mui/material";

const UserList = props => {
	const getSecondaryText = user => {
		let secondaryText = "";
		if (user.userId === props.myUserId) {
			secondaryText = "You";
		}

		if (user.isOwner) {
			if (secondaryText.length === 0) {
				secondaryText += "Owner";
			} else {
				secondaryText += ", Owner";
			}
		}
		return secondaryText;
	};

	return (
		<Box sx={{ width: "100%" }}>
			<List
				subheader={<ListSubheader>Users in the room</ListSubheader>}
				sx={{
					width: "100%",
					mt: 2,
					bgcolor: "background.paper",
					borderRadius: 1,
					borderWidth: 5,
					borderColor: "white",
				}}
				aria-label="contacts"
			>
				{props.users.map(user => (
					<ListItem sx={{ pt: 0 }} key={user.userId}>
						<ListItemText primary={user.username} secondary={getSecondaryText(user)} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default UserList;
