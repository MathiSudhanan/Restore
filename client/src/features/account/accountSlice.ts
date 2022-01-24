import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setBasket } from "../basket/basketSlice";

export interface AccountState {
  user: User | null;
  isSessionExpired: boolean;
  redirectUrl: string;
}

const initialState: AccountState = {
  user: null,
  isSessionExpired: true,
  redirectUrl: "",
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data: FieldValues, thunkAPI: any) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error!.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_: any, thunkAPI: any) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error!.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) {
        return false;
      }
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setURL: (state, action) => {
      state.redirectUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.rejected, (state, action) => {
      throw action.payload;
    });

    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      // const history = createBrowserHistory();
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session expired - please login again");

      state.isSessionExpired = true;
      state.redirectUrl = "/";
      // myHistory.replace("/", {});
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
        state.isSessionExpired = false;
        state.redirectUrl = "";
      }
    );
  },
});

export const { signOut, setUser, setURL } = accountSlice.actions;
