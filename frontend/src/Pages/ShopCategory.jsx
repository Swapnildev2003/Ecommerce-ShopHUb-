import React, { useContext, useState } from 'react';
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../components/Assets/dropdown_icon.png";
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [sortOption, setSortOption] = useState('default');

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

  const sortProducts = (products, option) => {
    switch (option) {
      case 'priceLowHigh':
        return products.sort((a, b) => a.new_price - b.new_price);
      case 'priceHighLow':
        return products.sort((a, b) => b.new_price - a.new_price);
      case 'nameAZ':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameZA':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  show_item = sortProducts(show_item, sortOption);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing {show_item.length}</span> out of {show_item.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAZ">Name: A to Z</option>
            <option value="nameZA">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products" style={{ maxHeight: (showAllProducts) ? "none" : "70vh", overflow: showAllProducts ? "visible" : "hidden" }}>
        {show_item.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            category={props.category}
          />
        ))}
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
