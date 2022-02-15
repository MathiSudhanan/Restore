import { LoadingButton } from "@material-ui/lab";
import { Remove, Add, Delete } from "@mui/icons-material";
import { Paper, Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <>
      {items.map((item) => (
        <Grid container component={Paper}>
          <Grid item xs={9}>
            <Box display='flex' alignItems='center'>
              <img
                src={item.pictureUrl}
                alt={item.name}
                style={{ height: 50, marginRight: 20 }}
              />

              <span>{item.name}</span>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display='flex' alignItems='center' sx={{ mt: 2 }}>
              ${(item.price / 100).toFixed(2)}
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ borderBottom: 1, borderColor: "lightgrey" }}>
            <Box display='flex' alignItems='center'>
              {isBasket && (
                <LoadingButton
                  loading={status.includes(
                    "pendingRemoveItem" + item.productId + "rem"
                  )}
                  onClick={() =>
                    dispatch(
                      removeBasketItemAsync({
                        productId: item.productId!,
                        quantity: 1,
                        name: "rem",
                      })
                    )
                  }
                  color='error'
                >
                  <Remove />
                </LoadingButton>
              )}
              {item.quantity}
              {isBasket && (
                <LoadingButton
                  loading={status === "pendingAddItem" + item.productId}
                  onClick={() =>
                    dispatch(
                      addBasketItemAsync({
                        productId: item.productId,
                        quantity: 1,
                      })
                    )
                  }
                  color='error'
                >
                  <Add />
                </LoadingButton>
              )}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ borderBottom: 1, borderColor: "lightgrey" }}>
            <Box display='flex' alignItems='center' sx={{ mt: 1 }}>
              ${((item.price / 100) * item.quantity).toFixed(2)}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ borderBottom: 1, borderColor: "lightgrey" }}>
            {isBasket && (
              <LoadingButton
                color='error'
                loading={
                  status === "pendingRemoveItem" + item.productId + "del"
                }
                onClick={() =>
                  dispatch(
                    removeBasketItemAsync({
                      productId: item.productId!,
                      quantity: item.quantity,
                      name: "del",
                    })
                  )
                }
              >
                <Delete />
              </LoadingButton>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default BasketTable;
