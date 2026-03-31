import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Item/Item";

const NewCollection = () => {
  const [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/new_collection")
      .then((resp) => resp.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className="new-collection">
      <h1>New Collections</h1>
      <hr />
      <div className="collection">
        {new_collection.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default NewCollection;
