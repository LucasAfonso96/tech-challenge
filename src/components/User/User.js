import React from "react";
import { Typography } from "@mui/material";
import "./User.css";

const User = ({ client }) => {
const { client_id, first_name, job, job_descriptor } = client;

  return (
    <div className="user-container" data-testid="user-container">
      <Typography className="user-id" data-testid="user-id">{client_id}</Typography>
      <div className="user-info" data-testid="user-info">
        <Typography variant="h5" className="name">{first_name}</Typography>
        <Typography variant="body2" className="job">{job}</Typography>
        <Typography variant="body1" className="job-descriptor">{job_descriptor}</Typography>
      </div>
    </div>
  );
};

export default User;