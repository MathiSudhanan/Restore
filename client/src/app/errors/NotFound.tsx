import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper}>
      <Typography variant='h3' gutterBottom>
        Oops-We could not find what you are looking for
      </Typography>
      <Divider></Divider>
      <Button fullWidth component={Link} to='/catalog'>
        Go back to shop
      </Button>
    </Container>
  );
};

export default NotFound;
