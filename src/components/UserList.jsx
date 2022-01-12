import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { ListSubheader } from "@mui/material";

const UserList = (props) => {
  return (
    // <Box>
    <List
      align="center"
      subheader={<ListSubheader>Room</ListSubheader>}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      aria-label="contacts">
      {props.users.map((user) => (
        <ListItem>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={user} />
        </ListItem>
        // <ListItem disablePadding>
        //   <ListItemButton>
        //     <ListItemText inset primary="Eric Hoffman" />
        //   </ListItemButton>
        // </ListItem>
      ))}
    </List>
    // </Box>
  );
};

export default UserList;
