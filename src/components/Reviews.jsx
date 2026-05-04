import React, { useEffect, useState } from 'react';
import RatingCustom from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review, get_reviews, messageClear, product_details } from '../stores/reducers/productReducers';
import toast from 'react-hot-toast';
const Reviews = ({ product }) => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const { successMessage, reviews, rating_review, totalReview } = useSelector(state => state.product)
  const [parPage,] = useState(5);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(get_reviews({
        productId: product._id,
        currentPage
      }))
      dispatch(product_details(product.slug));
      setRating('');
      setReview('')
      dispatch(messageClear())
    }
  }, [successMessage, dispatch, product, currentPage])
  const review_submit = (e) => {
    e.preventDefault()
    const obj = {
      name: userInfo.name,
      review,
      rating,
      productId: product._id
    }
    dispatch(customer_review(obj))
  }

  useEffect(() => {
    if (product._id) {
      dispatch(get_reviews({
        productId: product._id,
        currentPage
      }))
    }
  }, [product, currentPage, dispatch])
  return (
    <div className='mt-8'>
      <div className='flex flex-col lg:flex-row gap-5 lg:gap-30'>
        <div className='flex flex-col gap-2 justify-start items-start py-4'>
          <div>
            <span className='font-semibold text-3xl'>{product.rating}</span>
            <span className='font-semibold text-2xl'>/5</span>
          </div>
          <div className='flex text-xl gap-2'>
            <RatingCustom ratings={product.rating} />
          </div>
          <p className='text-slate-600'>{totalReview} đánh giá</p>
        </div>
        <div className='flex gap-2 flex-col py-4'>
          {rating_review.map((item) => {
            const percent = totalReview
              ? (item.sum / totalReview) * 100
              : 0;

            return (
              <div
                key={item.rating}
                className="flex justify-start items-center gap-5"
              >
                <div className="flex gap-1 w-[93px]">
                  <RatingTemp ratings={item.rating} />
                </div>

                <div className="w-[200px] h-3.5 bg-slate-200 rounded">
                  <div
                    className="h-full bg-[#edbb0e] rounded transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <p className="text-slate-600">{item.sum}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className='text-slate-600 font-bold text-xl py-5'>Đánh giá sản phẩm ({totalReview})</h2>
        <div className='flex flex-col gap-5'>
          {
            reviews?.map((r, i) => <div key={i} className='flex flex-col gap-1'>
              <div className='flex justify-between items-center '>
                <div className='flex gap-1 text-xs'>
                  <RatingTemp ratings={r.rating} />
                </div>
                <span className='text-slate-600 text-sm'>{new Date(r.date).toLocaleDateString('vi-VN')}</span>
              </div>
              <span className='text-slate-600 text-sm font-bold'>{r.name}</span>
              <p className='text-slate-600'>{r.review}</p>
            </div>)
          }
          <div className='flex justify-end items-center'>
            {
              totalReview > 5 && <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalReview}
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
                <form onSubmit={review_submit}>
                  <textarea onChange={(e) => setReview(e.target.value)} value={review} className='border border-[#c2c2c2] rounded-md outline-none w-full p-3' cols={30} rows={5}></textarea>
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