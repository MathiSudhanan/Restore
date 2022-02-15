import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import Avatar from "@mui/material/Avatar";

const SignedInMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string | undefined) {
    let nameStr = name ? name : "";

    if (nameStr) {
      if (nameStr.split(" ").length > 1) {
        return {
          sx: {
            bgcolor: stringToColor(nameStr),
          },
          children: `${nameStr.split(" ")[0][0]}${nameStr.split(" ")[1][0]}`,
        };
      } else {
        return {
          sx: {
            bgcolor: stringToColor(nameStr),
          },
          children: `${nameStr.split(" ")[0][0]}`,
        };
      }
    }
    return;
  }

  return (
    <>
      {user && (
        <Button color='inherit' onClick={handleClick} sx={{ typography: "h6" }}>
          <Avatar {...stringAvatar(user?.email)} />
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to='/orders'>
          My Orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default SignedInMenu;
