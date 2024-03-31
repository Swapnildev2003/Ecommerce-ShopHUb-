import React from "react" ;
import "./DescriptionBox.css"
const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>

            </div>
            <div className="descriptionbox-description">
               <p>An ecommerce website is your digital storefront on the internet. 
                It facilitates the transaction between a buyer and seller. It is the virtual space 
                where you showcase products, and online customers make selections.</p>
                <p> An eCommerce website is an online platform where businesses sell products or services to customers over the internet. 
                    It provides a virtual storefront that allows users to browse through a catalog of products, add items to a digital
                     shopping cart, and complete transactions securely using various payment methods.
                     These websites typically feature a range of functionalities, including product listings with descriptions 
                     and images, a user-friendly checkout process, secure payment gateways, and order management systems.</p> 
            </div>
        </div>
    )
}

export default DescriptionBox