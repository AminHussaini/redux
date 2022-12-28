import React from "react";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotifications } from "../store/ui-slice";

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const handle = () => {
    dispatch(
      showNotifications({
        open: false,
      })
    );
  };
  return (
    <div>
      <Alert onClose={handle} severity={type}>
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
