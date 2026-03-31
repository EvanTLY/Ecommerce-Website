import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItem, setCartItem] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/all_products")
      .then((resp) => resp.json())
      .then((data) => setAllProduct(data));

    if (localStorage.getItem("authToken")) {
      fetch("http://localhost:4000/get_cart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          authToken: `${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => setCartItem(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("authToken")) {
      fetch("http://localhost:4000/add_to_cart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          authToken: `${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json)
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("authToken")) {
      fetch("http://localhost:4000/remove_from_cart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          authToken: `${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json)
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item),
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
