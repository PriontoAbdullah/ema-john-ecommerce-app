import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/cart';
import happyImage from '../../images/giphy.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const auth = useAuth();

    const handlePlaceOrder = () => { // After proceed Checkout
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const handleRemoveProduct = productKey => {
        // console.log('remove clicked', productKey);
        const newCart = cart.filter(item => item.key !== productKey); //expect select item , store others items
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(productItem => productItem.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);
    }, [])

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="happy Image" />
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(productElement => <ReviewItem
                        key={productElement.key}
                        product={productElement}
                        handleRemoveProduct={handleRemoveProduct}
                    ></ReviewItem>)
                }
                {
                    thankYou
                }
                {
                    !cart.length && <h1>Yor cart is empty. <a href="/shop"> Keep shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user ?
                                <button className="add-button" onClick={handlePlaceOrder}>
                                    <FontAwesomeIcon icon={faShoppingBag} /> Proceed Checkout</button>
                                :
                                <button className="add-button" >
                                    <FontAwesomeIcon icon={faSignInAlt} /> Login to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    )
}

export default Review;