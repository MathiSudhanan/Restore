import { Typography } from "@mui/material";

interface Props {}

const CheckoutPage = (props: Props) => {
  return (
    <Typography variant='h3'>
      Only logged in users should be able to view this page!
    </Typography>
  );
};

export default CheckoutPage;
