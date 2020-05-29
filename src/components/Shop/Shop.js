import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/cart';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);

        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(productItem => productItem.key === existingKey);
            // console.log(existingKey, savedCart[existingKey]);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        // console.log(newCart);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(productItem => productItem.key === toBeAddedKey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(productItem => productItem.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(productItem => <Product
                        key={productItem.key}
                        handleAddProduct={handleAddProduct}
                        showAddToCart={true}
                        product={productItem}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="add-button">
                        <FontAwesomeIcon icon={faSearchDollar} /> Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;