/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import CustomAppBar from "../appbar/appbar";
import { useLink } from "../context/meetContext";
import { getEvents } from "../api";
import CreateMeetModal from "../modal/createMeetModal";

const Dashboard = () => {
  const { linkCreated, setLinkCreated } = useLink();
  const [showModal, setShowModal] = React.useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
  });

  const handleCopy = (link) => {
    // add copy to clipboard code here
    navigator.clipboard && navigator.clipboard.writeText(link);
    setSnackbar({
      ...snackbar,
      open: true,
      msg: "Link is copied.",
    });
  };

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleJoin = (link) => {
    if (link) {
      window.open(link, "_blank"); // Opens the Meet link in a new tab
    } else {
      console.error("No Meet link available.");
    }
  };

  useEffect(() => {
    console.log(linkCreated);
    setLoading(true);
    getEvents(setEvents, setLoading, setLinkCreated);
  }, [linkCreated]);

  return (
    <>
      <CustomAppBar
        showModal={showModal}
        setShowModal={setShowModal}
      ></CustomAppBar>
      <Box bgcolor={"#ffffff"} display={"flex"} flexDirection={"column"}>
        <Box
          borderRadius={"5px"}
          bgcolor={"#daffdc"}
          flexGrow={1}
          p={1}
          mt={1}
          justifyContent={loading ? "center" : ""}
          display={loading ? "flex" : "block"}
        >
          {loading ? (
            <CircularProgress size={20} color="success"></CircularProgress>
          ) : (
            <>
              <Typography
                sx={{
                  alignSelf: "center",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                {events.length > 0
                  ? "Upcoming Sessions"
                  : "No Records Found..."}
              </Typography>
              {events.map((event, index) => (
                <Card
                  key={`meet-${index}`}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    border: "1px solid #2e7d32",
                    marginTop: "5px",
                    borderRadius: "5px",
                    boxShadow: 2,
                    overflow: "visible", // Ensures the button stays visible if card content is long
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {event.meetingName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start Time: {new Date(event.startTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      End Time: {new Date(event.endTime).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="small"
                      onClick={() => handleCopy(event.meetingLink)}
                    >
                      Copy Link
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ marginTop: "8px" }}
                      onClick={() => handleJoin(event.meetingLink)}
                    >
                      Join
                    </Button>
                  </Box>
                </Card>
              ))}
            </>
          )}
        </Box>
        {snackbar.open ? (
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbar.msg}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        ) : null}
      </Box>
      <CreateMeetModal
        open={showModal}
        setShowModal={setShowModal}
      ></CreateMeetModal>
    </>
  );
};

export default Dashboard;
