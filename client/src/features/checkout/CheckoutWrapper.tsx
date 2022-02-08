import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage";

interface Props {}
const stripePromise = loadStripe(
  // "pk_test_51KOj4eSAUhJrQ47KASfHM2BLXOp37slGvYFQ4GbAr149AbkIyq70IWYFGNFXzvogY4PuF2G9Szvi6a4PNSbe09QN00tCNtgObu"
  "pk_test_51KQ5elGfuNYhhn0zWdfGNMYmaewuZds9FKCc4YPuKeQq9vVcR6v6dbHrbBL4hPbaGVPDrNydYu7iDycGvjpRwzX400kvBS0Fnh"
);
const CheckoutWrapper = (props: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Loading message='Loading checkout...' />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper;
