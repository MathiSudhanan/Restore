import { Typography, Grid, Button } from "@mui/material";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import BasketTableSM from "../basket/BasketTableSM";

import { Order } from "../../app/models/order";
import { BasketItem } from "../../app/models/basket";
import { convertPrice } from "../../app/util/util";
import { useState, useEffect } from "react";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const OrderDetails = ({ order, setSelectedOrder }: Props) => {
  const subTotal =
    order.orderItems.reduce(
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
      <Grid container>
        {isSMVersion ? (
          <>
            <Grid item xs={7} sm={0}>
              <Typography variant='h6' gutterBottom>
                Order #{order.id} - {order.orderStatus}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setSelectedOrder(0)}
              >
                Orders
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={0} sm={10}>
              <Typography variant='h3' gutterBottom>
                Order #{order.id} - {order.orderStatus}
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
          </>
        )}
      </Grid>
      {order && (
        <>
          {isSMVersion ? (
            <BasketTableSM
              items={order.orderItems as BasketItem[]}
              isBasket={false}
            />
          ) : (
            <BasketTable
              items={order.orderItems as BasketItem[]}
              isBasket={false}
            />
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
};

export default OrderDetails;
