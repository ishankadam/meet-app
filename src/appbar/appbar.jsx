import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CustomAppBar = (props) => {
  const handleCreateLink = () => {
    props.setShowModal(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="success">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StressAway
          </Typography>
          <Button
            color="success"
            sx={{ background: "#ffffff" }}
            onClick={handleCreateLink}
          >
            Create Meeting
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;
