import React from "react";
import { Paper } from "@mui/material";
import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const BottomNavbar = ({ tab, setTab }) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: {
          xs: "block",
          md: "none",
        },
      }}
      elevation={3}>
      <BottomNavigation
        showLabels
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue);
        }}>
        <BottomNavigationAction label="Matches" icon={<PersonIcon />} />
        <BottomNavigationAction label="Restaurants" icon={<PersonIcon />} />
        <BottomNavigationAction label="Users" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
