import React, { useContext, useState } from 'react';
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../components/Assets/dropdown_icon.png";
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const rentalOptions = [
    { value: "1", label: "1 Day" },
    { value: "3", label: "3 Days" },
    { value: "7", label: "1 Week" },
    { value: "30", label: "1 Month" }
  ];

  const getRandomRentalPeriod = () => {
    const randomIndex = Math.floor(Math.random() * rentalOptions.length);
    return rentalOptions[randomIndex].value;
  };

  let show_item = all_product.filter((current_value) => current_value['category'] === props.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing {show_item.length}</span> out of {show_item.length} products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products" style={{ maxHeight: (showAllProducts) ? "none" : "70vh", overflow: showAllProducts ? "visible" : "hidden" }}>
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                category={props.category}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore" onClick={() => {
        if (show_item.length > 4) {
          setShowAllProducts(prev => !prev);
        }
      }}>
        Explore {showAllProducts ? "Less" : "More"}
      </div>
    </div>
  );
};

export default ShopCategory;
