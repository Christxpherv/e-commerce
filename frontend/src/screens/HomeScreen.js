import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen({ searchQuery, filteredProducts }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const displayedProducts = searchQuery ? filteredProducts : products;

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))
          ) : (
            <MessageBox>No products found</MessageBox>
          )}
        </div>
      )}
    </div>
  );
}
