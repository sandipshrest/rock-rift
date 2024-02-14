import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/reducerSlice/userSlice";
import cartReducer from "@/redux/reducerSlice/cartSlice";
import wishlistReducer from "@/redux/reducerSlice/wishlistSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [logger],
});

export const persistor = persistStore(store);
