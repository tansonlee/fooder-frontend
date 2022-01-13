import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Layout from "../../components/Layout";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { FormHelperText } from "@mui/material";

const EnterRoom = (props) => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    props.setRoomId(roomId);
    navigate("/room-lobby", {
      state: {
        username: username,
        roomId: roomId,
      },
    });
  };

  return (
    <Layout>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100%">
        {/* <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 3 }}> */}
        <Box
          sx={{
            //backgroundColor: "#DC405C",
            borderRadius: "2%",
            p: 3,
            mt: "-5vw",
            //backgroundColor: "orange",
            width: "800px",
            maxWidth: "100vw",
          }}
          textAlign="center">
          <Typography variant="h3" gutterBottom component="h3">
            Enter a Room
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={
              {
                //mt: 4,
                //backgroundColor: "blue",
              }
            }>
            {/* <TextInput style={styles.input} value={username} onChangeText={setUsername} /> */}
            <Grid item sm={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={username}
                color="secondary"
                onChange={handleChange(setUsername)}
                fullWidth
                // onChangeText={setUsername}
              />
              <FormHelperText sx={{ pl: 1 }} id="component-helper-text">
                This will be displayed to others in your room
              </FormHelperText>
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Room ID"
                variant="outlined"
                value={roomId}
                color="secondary"
                onChange={handleChange(setRoomId)}
                fullWidth
                // onChangeText={setRoomId}
              />
              <FormHelperText sx={{ pl: 1 }} id="component-helper-text">
                Enter a Room ID
              </FormHelperText>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            align="center"
            justify="center"
            sx={{ m: 3 }}
            color="secondary"
            onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Stack>
    </Layout>
  );
};

// const styles = StyleSheet.create({
// 	input: {
// 		height: 40,
// 		margin: 12,
// 		borderWidth: 1,
// 		padding: 10,
// 	},
// });

export default EnterRoom;
