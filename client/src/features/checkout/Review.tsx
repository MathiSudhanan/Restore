import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/store/configureStore";
import { convertPrice } from "../../app/util/util";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  const subTotal =
    basket?.items.reduce(
      (sum, item) => sum + convertPrice(item.price) * item.quantity,
      0
    ) ?? 0;
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      {basket && (
        <>
          <BasketTable items={basket?.items} isBasket={false} />
          <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <BasketSummary subTotal={subTotal} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
