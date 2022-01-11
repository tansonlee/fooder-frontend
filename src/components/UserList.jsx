import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { ListSubheader } from "@mui/material";

const UserList = (props) => {
  return (
    // <Box>
    <List
      subheader={<ListSubheader>Users</ListSubheader>}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      aria-label="contacts">
      {props.users.map((user) => (
        <ListItem disablePadding>
          <ListItemButton>
            {/* <ListItemIcon>
              <StarIcon />
            </ListItemIcon> */}
            <ListItemText primary={user} />
          </ListItemButton>
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
