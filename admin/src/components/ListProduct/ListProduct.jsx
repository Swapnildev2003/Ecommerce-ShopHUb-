import React from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    // State to store all products
    const [allProds, setAllProd] = React.useState([]);
    const [state, setstate] = React.useState(false);
    // Fetch data on component mount
    React.useEffect(() => {
        fetch('http://localhost:4000/allProds')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAllProd(data);
            });
    }, [state]);

    // Function to remove a product
    const removeProduct = async (id) => {
        await fetch(`http://localhost:4000/removeproduct`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        setstate((prev) => !prev);
    };

    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className='listproduct-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className='listproduct-allproducts'>
                <hr />
                {allProds.map((product, index) => (
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className='listproduct-product-icon' />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
