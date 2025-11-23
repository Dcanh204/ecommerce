import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Range } from 'react-range';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import Product from '../components/products/Product';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import ShopProduct from '../components/products/ShopProduct';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, query_products } from '../stores/reducers/productReducers';
import { useParams, useSearchParams } from 'react-router-dom';

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('searchValue');
  console.log(searchValue);
  const { latest_product, products_shop, totalProduct, parPage } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  const [filter, setFilter] = useState(false);
  const [state, setState] = useState({ values: [0, 50000000] })
  const [rating, setRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortPrice, setSortPrice] = useState('');
  const [category,] = useState('');
  // query product
  useEffect(() => {
    dispatch(query_products({
      low: state.values[0],
      high: state.values[1],
      category: '',
      rating,
      sortPrice,
      pageNumber: currentPage,
      searchValue
    }))
  }, [state.values, searchValue, category, rating, sortPrice, currentPage, dispatch])
  return (
    <div>
      <Header />
      <section className='pt-35 pb-25 sm:pt-30 lg:pt-40'>
        <div className='w-[90%] border mx-auto border-[#e9ebf0] mb-10'></div>
        <div className='w-[90%] h-full mx-auto'>
          <div className={`block sm:hidden ${filter ? 'mb-6' : 'mb-0'}`}>
            <button onClick={() => setFilter(!filter)} className='text-center px-3 py-2 w-full text-white bg-indigo-400'>Lọc sản phẩm</button>
          </div>
          <div className="flex w-full flex-wrap">
            <div className="w-full sm:w-3/12 pr-0 xl:pr-7">
              <div className={`${filter ? 'h-auto mb-0' : 'h-0 overflow-hidden mb-6'} sm:h-auto sm:overflow-visible sm:mb-0`}>
                <div className='py-2 flex flex-col gap-5'>
                  <h2 className='text-3xl font-bold text-slate-600'>Giá</h2>
                  <Range
                    step={10000}
                    min={0}
                    max={50000000}
                    values={state.values}
                    onChange={(values) => setState({ values })}
                    renderTrack={({ props, children }) => (
                      <div {...props} className='max-w-[350px] h-1.5 bg-slate-200 rounded-full'>
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div {...props} key={props.key} className='h-[15px] w-[15px] bg-[#059473] rounded-full' />
                    )}
                  />
                </div>
                <span className='text-slate-800 text-lg font-bold'>{Math.floor(state.values[0]).toLocaleString('vi-VN')}đ - {Math.floor(state.values[1]).toLocaleString('vi-VN')}đ</span>

                <div className='flex flex-col py-5 gap-4'>
                  <h2 className='text-3xl font-bold text-slate-600'>Đánh giá</h2>
                  <div className='flex flex-col gap-3'>
                    <div onClick={() => setRating(5)} className='flex justify-start item-start text-yellow-500 gap-2 text-xl md:gap-3 md:text-2xl cursor-pointer'>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                    </div>
                    <div onClick={() => setRating(4)} className='flex justify-start item-start text-yellow-500 gap-2 text-xl md:gap-3 md:text-2xl cursor-pointer'>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><CiStar /></span>
                    </div>
                    <div onClick={() => setRating(3)} className='flex justify-start item-start text-yellow-500 gap-2 text-xl md:gap-3 md:text-2xl cursor-pointer'>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                    </div>
                    <div onClick={() => setRating(2)} className='flex justify-start item-start text-yellow-500 gap-2 text-xl md:gap-3 md:text-2xl cursor-pointer'>
                      <span><AiFillStar /></span>
                      <span><AiFillStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                    </div>
                    <div onClick={() => setRating(1)} className='flex justify-start item-start text-yellow-500 gap-2 text-xl md:gap-3 md:text-2xl cursor-pointer'>
                      <span><AiFillStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                    </div>
                    <div onClick={() => setRating('')} className='flex justify-start item-start text-yellow-500 gap-2 text-xl md:gap-3 md:text-2xl cursor-pointer'>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                      <span><CiStar /></span>
                    </div>
                  </div>
                </div>
                <div className='hidden py-5 min-[1650px]:flex flex-col'>
                  <Product title='Sản phẩm mới nhất' products={latest_product} />
                </div>
              </div>

            </div>


            <div className="w-full sm:w-9/12">
              <div className='pl-0 sm:pl-8'>
                <div className='py-3 xl:py-4 mb-10 bg-white rounded-md flex justify-between items-start px-3  border border-[#dcdee4]'>
                  <h2 className='text-lg font-medium text-slate-600'>{totalProduct} Sản phẩm</h2>
                  <div className='flex justify-center items-center gap-3'>
                    <select onChange={(e) => setSortPrice(e.target.value)} className='p-1 border border-[#e9ebf0] rounded-md outline-none text-slate-600 font-semibold' name="" id="">
                      <option value="">Sắp xếp</option>
                      <option value="low-to-high">Giá thấp đến cao</option>
                      <option value="high-to-low">Giá cao đến thấp</option>
                    </select>
                    <div className=' hidden lg:flex justify-center items-center gap-4'>
                      <div className='p-2  text-slate-600 hover:bg-slate-300 cursor-pointer rounded-md bg-slate-300'>
                        <span><BsFillGridFill /></span>
                      </div>
                      <div className='p-2 hover:bg-slate-300  text-slate-600 cursor-pointer rounded-md'>
                        <span><FaThList /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pb-8'>
                  <ShopProduct products={products_shop} />
                </div>
                <div className='flex justify-center items-center'>
                  {totalProduct > parPage && <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    totalItem={totalProduct}
                    parPage={parPage}
                    showItem={3}
                  />}
                </div>
              </div>
            </div>

          </div>



        </div>
      </section>
      <Footer />
    </div >
  );
};

export default SearchProduct;