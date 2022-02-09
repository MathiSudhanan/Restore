import { Typography } from "@mui/material";
import { Paper } from "@mui/material";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
      <Paper>
        <Typography variant='h1' gutterBottom textAlign='center'>
          Welcome to the Home Page!
        </Typography>
      </Paper>
    </>
  );
};

export default HomePage;
