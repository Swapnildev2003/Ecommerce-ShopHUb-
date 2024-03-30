import React , {useContext} from 'react';
import "./CSS/ShopCategory.css";
import {ShopContext} from "../Context/ShopContext";
import dropdown_icon from "../components/Assets/dropdown_icon.png";
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span> Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />

        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if(props.category == item.category){
            return <Item  key={i} id={item.id} name={item.name} image={item.image}   new_price={item.new_price} old_price= {item.old_price} />
          }
          else{
            return "ckjsmdjmcsdmjmjdmjddfdfdfsdceehbrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr";
          }
        })}
      </div>
      
    </div>
  )
}

export default ShopCategory
