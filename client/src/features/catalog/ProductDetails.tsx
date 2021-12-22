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
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContextValue";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/product";

const ProductDetails = (/*props: Props*/) => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const item = basket?.items.find((i) => i.productId === product?.id);

  const handleOnQuantityChange = (event: any) => {
    let quantityVal = parseInt(event.target.value);
    if (quantityVal >= 0) {
      setQuantity(quantityVal);
    }
  };

  const handleAddOrUpdateCart = () => {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      let updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      let updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!, updatedQuantity))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    }
  };

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    agent.Catalog.details(parseInt(id))
      .then((product) => setProduct(product))
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, item]);
  if (loading) return <Loading message='Loading product...' />;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in cart'
              fullWidth
              value={quantity}
              onChange={handleOnQuantityChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={submitting}
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
