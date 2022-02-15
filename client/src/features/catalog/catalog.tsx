import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckBoxGroup from "../../app/components/CheckBoxGroup";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const [isFilterIcon, setIsFilterIcon] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimensions()
  // );

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFiltersAsync());
    }
  }, [filtersLoaded, dispatch]);

  const handleScreenResize = useCallback(
    (event: any) => {
      var dimensions = {
        width: event.target.innerWidth,
        height: event.target.innerHeight,
      };

      if (dimensions.width < 600) {
        setIsFilterIcon(true);
        setShowFilters(false);
      } else {
        setIsFilterIcon(false);
        setShowFilters(true);
      }

      console.log("width: " + dimensions.width);
      console.log("height: " + dimensions.height);
    },
    [showFilters]
  );

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      handleScreenResize(event);
    });
    return () => {
      window.removeEventListener("resize", (event) =>
        handleScreenResize(event)
      );
    };
  }, [handleScreenResize]);

  useEffect(() => {
    let { innerWidth: width, innerHeight: height } = window;
    if (width < 600) {
      setIsFilterIcon(true);
      setShowFilters(false);
    } else {
      setIsFilterIcon(false);
      setShowFilters(true);
    }
  }, []);

  console.log("Show filters: " + showFilters);

  if (!filtersLoaded) return <Loading></Loading>;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={12} sm={4} md={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch
            isFilterIcon={isFilterIcon}
            showFilters={showFilters}
            setIsFilterIcon={setIsFilterIcon}
            setShowFilters={setShowFilters}
          />
        </Paper>
        {showFilters && (
          <>
            <Paper sx={{ mb: 2, p: 2 }}>
              <RadioButtonGroup
                options={sortOptions}
                selectedValue={productParams.orderBy}
                onChange={(event: any) => {
                  dispatch(setProductParams({ orderBy: event.target.value }));
                }}
              ></RadioButtonGroup>
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }}>
              <CheckBoxGroup
                items={brands}
                checked={productParams.brands}
                onChange={(items: string[]) => {
                  dispatch(setProductParams({ brands: items }));
                }}
              />
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }}>
              <CheckBoxGroup
                items={types}
                checked={productParams.types}
                onChange={(items: string[]) => {
                  dispatch(setProductParams({ types: items }));
                }}
              />
            </Paper>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <ProductList products={products}></ProductList>
      </Grid>
      <Grid item xs={0} sm={4} md={3} />
      <Grid item xs={12} sm={8} md={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
