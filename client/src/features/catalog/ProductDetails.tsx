import { LoadingButton } from "@material-ui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  const { id } = useParams() as { id: string };

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );

  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((i) => i.productId === product?.id);

  const handleOnQuantityChange = (event: any) => {
    let quantityVal = parseInt(event.target.value);
    if (quantityVal >= 0) {
      setQuantity(quantityVal);
    }
  };

  const handleAddOrUpdateCart = () => {
    if (!item || quantity > item.quantity) {
      let updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: item?.productId!,
          quantity: updatedQuantity,
        })
      );
    } else {
      let updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: item.productId,
          quantity: updatedQuantity,
        })
      );
    }
  };

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product) {
      dispatch(fetchProductAsync(parseInt(id)));
    }
  }, [id, item, dispatch, product]);
  if (productStatus === "pendingFethProduct")
    return <Loading message='Loading product...' />;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item sm={6} xs={12}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>
          $ {(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in cart'
              fullWidth
              value={quantity}
              onChange={handleOnQuantityChange}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              sx={{ height: "55px" }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
              onClick={handleAddOrUpdateCart}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
