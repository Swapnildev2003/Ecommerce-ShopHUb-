import React, { useState } from 'react';
import './checkout.css'

const Checkout = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });
    const checkoutHandler = async (cartItemsDescription) => {

        if (cartItemsDescription.length === 0) {
            alert("Add items to cart")
        }
        else {
            const orderDetails = {
                ...formData,
                products: [...cartItemsDescription]
            };
            console.log(orderDetails)
            try {
                const res = await fetch("http://localhost:4000/checkout", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                });

                const result = await res.json()
                console.log(cartItemsDescription)
                alert(result.response.Status + '\n' + result.response.Info);


            } catch (error) {
                console.log('Error during checkout:', error, "this is the error");

            }
        }
    }
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        alert('Order placed successfully! Our delivery person will collect the payment upon delivery.');
        setIsOpen(false);
        checkoutHandler(props.cartItemsDescription)

    };

    return (
        <div>
            <button onClick={() => { setIsOpen(true); console.log(props.cartItemsDescription) }}>Add to Checkout</button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                        <div className="container">
                            <h2>Checkout</h2>
                            <div className="cod-info">
                                <p>We only accept Cash on Delivery (COD)</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h3>Shipping Address</h3>
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

                                <label htmlFor="state">State</label>
                                <select id="state" name="state" value={formData.state} onChange={handleChange} required>
                                    <option value="">Choose...</option>
                                    <option value="GK">Uttar Pradesh</option>
                                    <option value="RJ">Rajasthan</option>
                                    <option value="TP">Tripura</option>
                                    {/* Add more states as needed */}
                                </select>

                                <label htmlFor="zip">Zip Code</label>
                                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />

                                <button type="submit">PROCEED TO CHECKOUT</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
