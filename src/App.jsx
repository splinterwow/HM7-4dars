import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Checkout from "./pages/Chackout";
import ErrorPage from "./pages/ErrorPage";
import ProductDetails from "./pages/ProductDetails"; // Import ProductDetails
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";

export const TokenContext = createContext();
export const UserContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Navbar />
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <Navbar />
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Navbar />
                <Cart />
              </MainLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={
              <MainLayout>
                <Navbar />
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/products/:id" // Route for ProductDetails
            element={
              <MainLayout>
                <Navbar />
                <ProductDetails />
              </MainLayout>
            }
          />
          {token && (
            <>
              <Route
                path="/orders"
                element={
                  <MainLayout>
                    <Navbar />
                    <Orders />
                  </MainLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <MainLayout>
                    <Navbar />
                    <Checkout />
                  </MainLayout>
                }
              />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;