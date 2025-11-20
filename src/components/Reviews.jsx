import React, { useState } from 'react';
import RatingCustom from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const userInfo = {}
  return (
    <div className='mt-8'>
      <div className='flex flex-col lg:flex-row gap-5 lg:gap-30'>
        <div className='flex flex-col gap-2 justify-start items-start py-4'>
          <div>
            <span className='font-semibold text-5xl'>4.5</span>
            <span className='font-semibold text-3xl'>/5</span>
          </div>
          <div className='flex text-2xl gap-2'>
            <RatingCustom ratings={4.5} />
          </div>
          <p className='text-slate-600'>24 đánh giá</p>
        </div>
        <div className='flex gap-2 flex-col py-4'>
          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp ratings={5} />
            </div>
            <div className='w-[200px] h-3.5 bg-slate-200 '>
              <div className='h-full w-[60%] bg-[#edbb0e] '>
              </div>
            </div>
            <p className='text-slate-600'>10</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp ratings={4} />
            </div>
            <div className='w-[200px] h-3.5 bg-slate-200 '>
              <div className='h-full w-[70%] bg-[#edbb0e] '>
              </div>
            </div>
            <p className='text-slate-600'>20</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp ratings={3} />
            </div>
            <div className='w-[200px] h-3.5 bg-slate-200 '>
              <div className='h-full w-[20%] bg-[#edbb0e] '>
              </div>
            </div>
            <p className='text-slate-600'>4</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp ratings={2} />
            </div>
            <div className='w-[200px] h-3.5 bg-slate-200 '>
              <div className='h-full w-[30%] bg-[#edbb0e] '>
              </div>
            </div>
            <p className='text-slate-600'>5</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp ratings={1} />
            </div>
            <div className='w-[200px] h-3.5 bg-slate-200 '>
              <div className='h-full w-[10%] bg-[#edbb0e] '>
              </div>
            </div>
            <p className='text-slate-600'>2</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-slate-600 font-bold text-xl py-5'>Đánh giá sản phẩm (24)</h2>
        <div className='flex flex-col gap-8 pb-10 pt-4'>
          {
            [1, 2, 3, 4, 5, 6].map((r, i) => <div key={i} className='flex flex-col gap-1'>
              <div className='flex justify-between items-center '>
                <div className='flex gap-1 text-xl'>
                  <RatingTemp ratings={4} />
                </div>
                <span className='text-slate-600'>12-11-2025</span>
              </div>
              <span className='text-slate-600 text-[18px] font-medium'>Đình Cảnh</span>
              <p className='text-slate-600'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis sit unde quasi! Saepe at consectetur voluptatum ex repellendus dolor nisi facilis praesentium fuga, placeat nostrum nemo atque esse molestias aliquid.</p>
            </div>)
          }
          <div className='flex justify-end items-center'>
            {
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={10}
                parPage={parPage}
                showItem={3}
              />
            }
          </div>
        </div>
        <div>
          {
            userInfo ?
              <div className='flex flex-col gap-3'>
                <div className='flex gap-1'>
                  <Rating
                    onChange={(e) => setRating(e)}
                    initialRating={rating}
                    emptySymbol={<span className='text-slate-600 text-3xl'><CiStar /></span>}
                    fullSymbol={<span className='text-[#edbb0e] text-3xl'><FaStar /></span>}
                  />
                </div>
                <form>
                  <textarea className='border border-[#c2c2c2] rounded-md outline-none w-full p-3' cols={30} rows={5}></textarea>
                  <div className='my-2'>
                    <button className='py-2 px-4 bg-indigo-500 rounded-lg text-white cursor-pointer'>Đánh giá</button>
                  </div>
                </form>
              </div>
              :
              <Link to='/login' className='px-3 py-2 bg-red-500 rounded-lg text-white'>Vui lòng đăng nhập</Link>
          }
        </div>
      </div>
    </div >
  );
};

export default Reviews;