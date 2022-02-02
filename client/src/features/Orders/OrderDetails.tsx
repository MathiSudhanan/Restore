import { Typography, Grid, Button } from "@mui/material";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { Order } from "../../app/models/order";
import { BasketItem } from "../../app/models/basket";
import { convertPrice } from "../../app/util/util";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

const OrderDetails = ({ order, setSelectedOrder }: Props) => {
  const subTotal =
    order.orderItems.reduce(
      (sum, item) => sum + convertPrice(item.price) * item.quantity,
      0
    ) ?? 0;
  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h3' gutterBottom>
            Order #{order.id}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setSelectedOrder(0)}
          >
            Back to Orders
          </Button>
        </Grid>
      </Grid>
      {order && (
        <>
          <BasketTable
            items={order.orderItems as BasketItem[]}
            isBasket={false}
          />
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
};

export default OrderDetails;
