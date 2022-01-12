import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
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
			subheader={<ListSubheader>Users</ListSubheader>}
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
			aria-label="contacts"
		>
			{props.users.map(user => (
				<ListItem disablePadding id={user.userId}>
					<ListItemButton>
						<ListItemText primary={user.username} secondary={getSecondaryText(user)} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
		// </Box>
	);
};

export default UserList;
