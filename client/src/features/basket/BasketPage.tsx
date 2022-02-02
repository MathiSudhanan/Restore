import { Button, Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { convertPrice } from "../../app/util/util";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket)
    return <Typography variant='h3'>Your basket is empty.</Typography>;

  const subTotal =
    basket.items.reduce(
      (sum, item) => sum + convertPrice(item.price) * item.quantity,
      0
    ) ?? 0;

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subTotal={subTotal} />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth
          >
            CheckOut
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
