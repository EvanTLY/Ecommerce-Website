import React, { useContext } from "react";
import "./ProductDetail.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDetail = (props) => {
  const { product } = props;

  const { addToCart } = useContext(ShopContext);

  return (
    <div className="product-detail">
      <div className="product-detail-left">
        <div className="image-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="image">
          <img className="main-image" src={product.image} alt="" />
        </div>
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <div className="rating">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="price">
          <div className="old-price">${product.old_price}</div>
          <div className="new-price">${product.new_price}</div>
        </div>

        <div className="description">This is a description.</div>

        <div className="size">
          <h1>Select Size</h1>
          <div className="sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Add to Cart
        </button>
        <p className="category">
          <span>Category: </span>Women, T-shirt, Crop Top
        </p>
        <p className="category">
          <span>Tags: </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
