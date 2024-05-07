
import React from 'react';
import './AddProduct.css';
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
    const [image, setImage] = React.useState(false);
    const [productDetail, setProductDetail] = React.useState({ name: "", image: "", category: "Women", new_price: "", old_price: "" });  // product detail object to store the input

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetail);
        let responseData;
        let product = productDetail;
        let formdata = new FormData();
        formdata.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata,
        })
            .then((res) => res.json())
            .then((data) => {
                responseData = data;
            });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => data.succsess ? alert("Successfully added the Product") : alert(" Not  added the Product"))

        }
    };

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetail.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className="addproduct-itemfield">
                    <p>Price($)</p>
                    <input value={productDetail.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Old Price' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price($)</p>
                    <input value={productDetail.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Old Price' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetail.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value='Women'>women</option>
                    <option value='Men'>men</option>
                    <option value='Kid'>kid</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="Upload" />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>
                Add
            </button>
        </div>
    );
};

export default AddProduct;