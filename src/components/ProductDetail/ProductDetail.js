import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from '../../fakeData/index';

const ProductDetail = () => {
    const { productKey } = useParams();
    const product = fakeData.find(item => item.key === productKey);
    return (
        <div>
            <h1>{productKey} Detail Coming Soon.....</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;