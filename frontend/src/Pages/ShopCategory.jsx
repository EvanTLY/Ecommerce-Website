import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="shop-category">
      <img className="banner" src={props.banner} alt="" />
      <div className="shop-category-index">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>

        <div className="shop-category-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shop-category-product">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                newPrice={item.new_price}
                oldPrice={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="shop-category-load-more">Explore More</div>
    </div>
  );
};

export default ShopCategory;
