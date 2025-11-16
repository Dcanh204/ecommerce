import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Category from '../components/Category';
import FeatureProduct from '../components/products/FeatureProduct';
import Product from '../components/products/Product';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <Category />
      <div className='py-[45px]'>
        <FeatureProduct />
      </div>
      <div className='py-10'>
        <div className='w-[90%] flex flex-wrap mx-auto'>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'>
            <div className='overflow-hidden'>
              <Product title='Sản phẩm mới nhất' />
            </div>
            <div className='overflow-hidden'>
              <Product title='Sản phẩm đánh giá tốt nhất' />
            </div>
            <div className='overflow-hidden'>
              <Product title='Sản phẩm giảm giá' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;