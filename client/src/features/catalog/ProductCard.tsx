import { LoadingButton } from "@material-ui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { formatCurrency } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

interface props {
  product: Product;
}

const ProductCard = ({ product }: props) => {
  const { status } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();
  // function handleAddItem(productId: number) {
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      ></CardHeader>
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant='h5' component='div'>
          {formatCurrency(product.price, true)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          size='small'
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size='small'>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
