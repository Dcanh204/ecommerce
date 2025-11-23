import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Category from '../components/Category';
import FeatureProduct from '../components/products/FeatureProduct';
import Product from '../components/products/Product';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../stores/reducers/productReducers';

const Home = () => {
  const dispatch = useDispatch();
  const { products, latest_product, topRate_product, discount_product } = useSelector(state => state.product)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <Category />
      <div className='py-[45px]'>
        <FeatureProduct products={products} />
      </div>
      <div className='py-10'>
        <div className='w-[90%] flex flex-wrap mx-auto'>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'>
            <div className='overflow-hidden'>
              <Product title='Sản phẩm mới nhất' products={latest_product} />
            </div>
            <div className='overflow-hidden'>
              <Product title='Sản phẩm đánh giá tốt nhất' products={topRate_product} />
            </div>
            <div className='overflow-hidden'>
              <Product title='Sản phẩm giảm giá' products={discount_product} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;