import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import { endpoint } from "../env";

function ClipboardCopy({ copyText }) {
	const [isCopied, setIsCopied] = useState(false);

	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	}

	const toLink = text => {
		return endpoint + "/enter-room?roomId=" + text;
	};

	const handleCopyClick = () => {
		const link = toLink(copyText);
		copyTextToClipboard(link)
			.then(() => {
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1500);
			})
			.catch(err => {
				console.error(err);
			});
	};

	return (
		<Box
			sx={{
				border: "1px solid #fff",
				width: "16rem",
				height: "3rem",
				borderRadius: "8px",
				margin: "0 auto",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				p: 2,
				mt: 2,
			}}
		>
			<Typography
				variant="subtitle1"
				component="p"
				sx={{ fontSize: "1.2rem", letterSpacing: 3 }}
			>
				{copyText}{" "}
			</Typography>
			<Button onClick={handleCopyClick} sx={{ p: 0, m: 0, display: "inline-block" }}>
				{isCopied ? "Link Copied!" : "Copy Link"}
			</Button>
		</Box>
	);
}

export default ClipboardCopy;
