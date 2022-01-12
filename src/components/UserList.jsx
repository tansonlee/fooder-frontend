import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
		<List
			subheader={<ListSubheader>Users in the room</ListSubheader>}
			sx={{
				width: "100%",
				mt: 2,
				maxWidth: 360,
				bgcolor: "background.paper",
				borderRadius: 1,
			}}
			aria-label="contacts"
		>
			{props.users.map(user => (
				<ListItem key={user.userId}>
					<ListItemText primary={user.username} secondary={getSecondaryText(user)} />
				</ListItem>
			))}
		</List>
		// </Box>
	);
};

export default UserList;
