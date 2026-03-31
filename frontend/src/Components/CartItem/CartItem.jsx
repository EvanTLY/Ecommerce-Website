import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItem = () => {
  const { all_product, cartItem, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div className="cartItem">
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="format format-main">
                <img src={e.image} alt="" className="icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="quantity">{cartItem[e.id]}</button>
                <p>${e.new_price * cartItem[e.id]}</p>
                <img
                  className="remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="down">
        <div className="total">
          <h1>Cart Totals</h1>
          <div>
            <div className="total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button>CHECKOUT</button>
        </div>
        <div className="promote-code">
          <p>Promote Code</p>
          <div className="promote-code-box">
            <input type="text" placeholder="Promote Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
