import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItemButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  mode: boolean;
  handleOnChange: (event: any) => void;
}
const midLinks = [
  {
    title: "catalog",
    path: "/catalog",
  },
  {
    title: "about",
    path: "/about",
  },
  {
    title: "contact",
    path: "/contact",
  },
];

const rightLinks = [
  {
    title: "login",
    path: "/login",
  },
  {
    title: "register",
    path: "/register",
  },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

const Header = (props: Props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch
            {...label}
            checked={props.mode}
            color='default'
            onChange={props.handleOnChange}
          />
        </Box>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItemButton
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color='secondary'>
              <ShoppingCart></ShoppingCart>
              {/* <ShoppingCart */}
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItemButton
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
