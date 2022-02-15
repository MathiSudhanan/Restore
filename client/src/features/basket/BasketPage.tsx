import { Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { convertPrice } from "../../app/util/util";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";
import BasketTableSM from "./BasketTableSM";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [isSMVersion, setIsSMVersion] = useState(false);

  useEffect(() => {
    if (windowDimensions.width < 600) {
      setIsSMVersion(true);
    } else {
      setIsSMVersion(false);
    }
  }, [setIsSMVersion, windowDimensions.width]);

  if (!basket)
    return <Typography variant='h3'>Your basket is empty.</Typography>;

  const subTotal =
    basket.items.reduce(
      (sum, item) => sum + convertPrice(item.price) * item.quantity,
      0
    ) ?? 0;
  
  return (
    <>
      {isSMVersion ? (
        <BasketTableSM items={basket.items} />
      ) : (
        <BasketTable items={basket.items} />
      )}
      <Grid container>
        <Grid item sm={6} xs={0} />
        <Grid item sm={6} xs={12}>
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
