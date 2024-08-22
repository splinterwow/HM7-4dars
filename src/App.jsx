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
import ProductDetails from "./pages/ProductDetails";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";

export const TokenContext = createContext();
export const UserContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0); // Savatcha soni uchun holat

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length); // Savatchadagi mahsulotlar sonini yangilash
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Navbar cartCount={cartCount} /> {/* Savatcha sonini Navbar ga uzatish */}
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <Navbar cartCount={cartCount} />
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Navbar cartCount={cartCount} />
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
                <Navbar cartCount={cartCount} />
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/products/:id" 
            element={
              <MainLayout>
                <Navbar cartCount={cartCount} />
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
                    <Navbar cartCount={cartCount} />
                    <Orders />
                  </MainLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <MainLayout>
                    <Navbar cartCount={cartCount} />
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