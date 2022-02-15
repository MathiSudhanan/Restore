import { Button, debounce, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { FilterAlt } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface Props {
  isFilterIcon: boolean;
  showFilters: boolean;
  setIsFilterIcon: (event: any) => void;
  setShowFilters: (event: any) => void;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const ProductSearch = ({
  isFilterIcon,
  setIsFilterIcon,
  showFilters,
  setShowFilters,
}: Props) => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);
  console.log(isFilterIcon);
  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimensions()
  // );
  // useEffect(() => {
  //   if (windowDimensions.width < 600) {
  //     setIsFilterIcon(true);
  //     setShowFilters(false);
  //   } else {
  //     setIsFilterIcon(false);
  //     setShowFilters(true);
  //   }
  // }, [setIsFilterIcon, setShowFilters, windowDimensions.width]);

  if (isFilterIcon) {
    return (
      <Grid container>
        <Grid xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              label='Search Products'
              variant='outlined'
              fullWidth
              value={searchTerm}
              onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
              }}
            />
            <Button onClick={() => setShowFilters(!showFilters)}>
              <FilterAlt />
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container>
        <Grid xs={12}>
          <TextField
            label='Search Products'
            variant='outlined'
            fullWidth
            value={searchTerm}
            onChange={(event: any) => {
              setSearchTerm(event.target.value);
              debouncedSearch(event);
            }}
          />
        </Grid>
      </Grid>
    );
  }
};

export default ProductSearch;
