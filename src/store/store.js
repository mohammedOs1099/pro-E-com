import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import orders from "../store/order/orderSlice";
import auth from "../store/auth/authSlice";
import cart from "../store/cart/cartSlice";
import ui from "../store/ui/uiSlice";
import Products from "../store/product/productSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "users"]
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "totalPrice"]
};
const ordersPersistConfig = {
  key: "orders",
  storage,
  whitelist: ["orders"]
};
const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["language", "direction"] // تحديد الخصائص المراد تخزينها
};
const productsPersistConfig = {
  key: "products",
  storage,
  whitelist: ["products"] // تحديد الخصائص المراد تخزينها
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  cart: persistReducer(cartPersistConfig, cart),
  ui: persistReducer(uiPersistConfig, ui),
  products: persistReducer(productsPersistConfig, Products),
  orders: persistReducer(ordersPersistConfig, orders) // تحديد الخصا��ص المراد تخزينها
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

const persistor = persistStore(store);

export { store, persistor };
