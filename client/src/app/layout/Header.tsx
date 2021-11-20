import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

interface Props {
  mode: boolean;
  handleOnChange: (event: any) => void;
}

const Header = (props: Props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant='h6'>RE-STORE</Typography>
        <Switch
          {...label}
          checked={props.mode}
          color='default'
          onChange={props.handleOnChange}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
