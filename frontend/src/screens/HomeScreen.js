import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/HomeScreen.css';

export default function HomeScreen({ searchQuery, filteredProducts }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const displayedProducts = searchQuery ? filteredProducts : products;

  return (
    <div className="homescreen">
      {!searchQuery && (
        <div className="carousel-container">
          <Carousel
            showArrows={false} // Remove arrows
            showStatus={false}
            showIndicators={true} // Show dots (indicators)
            showThumbs={false}
            emulateTouch={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            stopOnHover={true}
            swipeable={true}
            dynamicHeight={false}
            className="custom-carousel"
          >
            <div className="slide">
              <img src="/images/sale.jpeg" alt="Slide 1" />
            </div>
            <div className="slide">
              <img src="/images/sale2.jpeg" alt="Slide 2" />
            </div>
            <div className="slide">
              <img src="/images/sale3.jpeg" alt="Slide 3" />
            </div>
          </Carousel>
        </div>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product-container">
          <div className="row center">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))
            ) : (
              <MessageBox>No products found</MessageBox>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
