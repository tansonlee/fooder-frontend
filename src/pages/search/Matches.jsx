import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Restaurant from "./Restaurant";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // background: theme.palette.action.disabledBackground,
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const Matches = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ p: 2, pl: 4, pr: 4 }}>
      <Typography sx={{ mb: 1 }} variant="h6" component="h4" align="center">
        Matches
      </Typography>
      {props.matchedRestaurants.map((rest, index) => (
        <Accordion
          key={rest.id}
          expanded={expanded === rest.id}
          onChange={handleChange(rest.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="panel1bh-content"
            id={rest.id}>
            <Typography
              color="primary"
              sx={{ width: "33%", flexShrink: 0, fontWeight: "450" }}>
              {rest.name}
            </Typography>
            <Typography sx={{ color: "text.secondary", ml: 2 }}>
              {rest.location.address1},&nbsp;{rest.location.city}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Restaurant key={rest.id} {...rest} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Matches;
