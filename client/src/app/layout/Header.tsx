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
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

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
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ /*flexGrow: 1,*/ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            {midLinks.map(({ title, path }) => (
              <ListItemButton
                component={Link}
                key={path}
                to={path}
                onClick={handleCloseNavMenu}
              >
                {title.toUpperCase()}
              </ListItemButton>
            ))}
          </Menu>
        </Box>

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
        <List
          /*sx={{ display: "flex" }}*/ sx={{
            // flexGrow: 1,
            display: { xs: "none", sm: "flex" },
          }}
        >
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
          <IconButton component={Link} to='/basket' sx={{ color: "inherit" }}>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart></ShoppingCart>
              {/* <ShoppingCart */}
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List
              // sx={{ display: "flex" }}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
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
          )}
        </Box>

        <Box
          // sx={{ flexGrow: 0 }}
          sx={{ /*flexGrow: 1,*/ display: { xs: "flex", md: "none" } }}
        >
          {!user && (
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src='/broken-image.jpg' />
              </IconButton>
            </Tooltip>
          )}
          <Menu
            sx={{ mt: "45px" }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user ? (
              <SignedInMenu />
            ) : (
              <>
                {rightLinks.map(({ title, path }) => (
                  <ListItemButton
                    component={NavLink}
                    onClick={handleCloseUserMenu}
                    to={path}
                    key={path}
                  >
                    <Typography textAlign='center'>
                      {title.toUpperCase()}
                    </Typography>
                  </ListItemButton>
                ))}
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
