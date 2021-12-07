import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { myHistory } from "../api/history";

interface Props {}

const ServerError = (props: Props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant='h4' color='error' gutterBottom>
            {state.error.title}
          </Typography>
          <Divider></Divider>
          <Typography>
            {state.error.detail || "inernal server error"}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='h5' gutterBottom>
            Server Error
          </Typography>
        </>
      )}
      <Button
        onClick={() => {
          navigate("/catalog");
        }}
      >
        Go back to the store
      </Button>
    </Container>
  );
};

export default ServerError;
