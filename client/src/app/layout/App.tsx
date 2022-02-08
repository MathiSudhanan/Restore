import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";

import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Contact from "../../features/contact/Contact";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Loading from "./Loading";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";

import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser, setURL } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/Orders/Orders";

function App() {
  const dispatch = useAppDispatch();
  const { isSessionExpired, redirectUrl } = useAppSelector(
    (state) => state.account
  );
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isSessionExpired &&
      redirectUrl !== "" &&
      location.pathname !== redirectUrl
    ) {
      console.log(location.pathname);
      let url = redirectUrl;
      dispatch(setURL(""));

      navigate(url);
    }
  }, [dispatch, isSessionExpired, location.pathname, navigate, redirectUrl]);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [dispatch, initApp]);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  const handleOnChange = (event: any) => {
    setDarkMode(!darkMode);
  };

  if (loading) return <Loading message='Intializing app...' />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header handleOnChange={handleOnChange} mode={darkMode} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<ProductDetails />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route
            path='/checkout'
            element={
              <PrivateRoute>
                <CheckoutWrapper />
              </PrivateRoute>
            }
          />
          <Route
            path='/Orders'
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='not-found' />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
