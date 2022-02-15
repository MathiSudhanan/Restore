import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import { convertPrice } from "../../app/util/util";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import BasketTableSM from "../basket/BasketTableSM";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  const subTotal =
    basket?.items.reduce(
      (sum, item) => sum + convertPrice(item.price) * item.quantity,
      0
    ) ?? 0;

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
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      {basket && (
        <>
          {isSMVersion ? (
            <BasketTableSM items={basket.items} isBasket={false} />
          ) : (
            <BasketTable items={basket.items} isBasket={false} />
          )}

          <Grid container>
            <Grid item sm={6} xs={0} />
            <Grid item sm={6} xs={12}>
              <BasketSummary subTotal={subTotal} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
