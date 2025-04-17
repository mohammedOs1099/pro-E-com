import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Login from "../pages/Login/Login";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Signup from "../pages/Signup/Signup";
import Order from "../pages/Orders/Orders";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import NotFound from "../pages/NotFound/NotFound";
import AuthProtected from './../components/AuthProtected/AuthProtected';
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/" element={<Home />}></Route>
        <Route
          path="login"
          element={
            <AuthProtected >
              <Login />
            </AuthProtected>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <AuthProtected>
              <Signup />
            </AuthProtected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);
export default routes;
