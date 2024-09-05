import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Box, Stack } from "@mui/material";
import { createMeetEvent } from "../api";
import { useLink } from "../context/meetContext";

const CreateMeetModal = (props) => {
  const [open, setOpen] = useState(props.open);
  const date = new Date();
  date.setHours(date.getHours(), 0, 0);

  const [meeting, setMeeting] = useState({
    name: "",
    startTime: date.toISOString().slice(0, 16), // ISO string format for input
    endTime: date.toISOString().slice(0, 16), // ISO string format for input
    type: "",
  });

  const { setLinkCreated } = useLink();

  const handleEdit = (value, field) => {
    setMeeting((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const formattedMeeting = {
      ...meeting,
      startTime: new Date(meeting.startTime),
      endTime: new Date(meeting.endTime),
    };
    createMeetEvent(formattedMeeting);
    setLinkCreated(true);
    props.setShowModal(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <Modal open={open} onClose={() => props.setShowModal(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          boxShadow: 4,
        }}
      >
        <h2>Create Meeting</h2>
        <TextField
          label="Meeting Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={meeting.name}
          onChange={(e) => handleEdit(e.target.value, "name")}
        />
        <TextField
          label="Start Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={meeting.startTime}
          onChange={(e) => handleEdit(e.target.value, "startTime")}
        />
        <TextField
          label="End Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={meeting.endTime}
          onChange={(e) => handleEdit(e.target.value, "endTime")}
        />
        <TextField
          label="Meeting Type"
          variant="outlined"
          fullWidth
          margin="normal"
          value={meeting.type}
          onChange={(e) => handleEdit(e.target.value, "type")}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "flex-end" }}
        >
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => props.setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateMeetModal;
