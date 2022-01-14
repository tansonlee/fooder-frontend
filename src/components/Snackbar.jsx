import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

function TransitionDown(props) {
	return <Slide {...props} direction="down" />;
}

export default function SimpleSnackbar({ open, setOpen, openMatches }) {
	// const [open, setOpen] = React.u  seState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<Button color="primary" size="small" onClick={openMatches}>
				See Matches
			</Button>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<Snackbar
			sx={{
				display: {
					xs: "block",
					md: "none",
				},
			}}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={open}
			autoHideDuration={2000}
			onClose={handleClose}
			message="New match!"
			action={action}
			TransitionComponent={TransitionDown}
		>
			<Alert color="secondary" icon={false} action={action}>
				New match!
			</Alert>
		</Snackbar>
	);
}
