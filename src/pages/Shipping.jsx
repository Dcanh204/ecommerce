import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { place_order } from '../stores/reducers/orderReducers';
import toast from 'react-hot-toast';

const Shipping = () => {

  const { products, price, shipping_fee, items } = useLocation().state;
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: ''
  })

  const inputHanler = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/p/')
      .then(res => setProvinces(res.data))
  }, [])

  const handleProvice = async (e) => {
    const code = e.target.value;
    const selected = provinces.find(p => p.code == code);
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
    setDistricts(res.data.districts)
    setWards([]);

    setState({
      ...state,
      province: selected.name,
      district: '',
      ward: '',
    })
  }

  const handleDistrict = async (e) => {
    const code = e.target.value;
    const selected = districts.find(d => d.code == code);
    const res = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
    setWards(res.data.wards);
    setState({
      ...state,
      district: selected.name,
      ward: ''
    })
  }
  const handlerWard = (e) => {
    const code = e.target.value;
    const selected = wards.find(w => w.code == code);
    setState({
      ...state,
      ward: selected.name
    })
  }
  const placeOrder = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!state.name.trim()) formErrors.name = "Tên không được để trống";
    if (!state.phone.trim()) formErrors.phone = "Số điện thoại không được để trống";
    if (state.phone.length < 10) formErrors.phone = "Số điện thoại không hợp lệ"
    if (!state.address.trim()) formErrors.address = "Địa chỉ không để trống";
    if (!state.province.trim()) formErrors.province = "Vui lòng chọn tỉnh";
    if (!state.district.trim()) formErrors.district = "Vui lòng chọn quận huyện";
    if (!state.ward.trim()) formErrors.ward = "Vui lòng chọn phường xã";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const orderInfo = {
        products,
        price,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
      }
      try {
        const result = await dispatch(place_order(orderInfo)).unwrap();
        navigation('/payment', {
          state: {
            items,
            totalPrice: price + shipping_fee,
            orderId: result.orderId
          }
        });

      } catch (error) {
        toast.error("Lỗi tạo đơn: ", error.message)
      }
    }
  }



  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }

  return (
    <div>
      <Header />
      <section className='pt-35 pb-25 sm:pt-30 md:bg-[#eeeeee]'>
        <div className='w-[90%] border mx-auto border-[#e9ebf0]'></div>
        <div className='w-[90%] xl:w-[70%] mx-auto py-16'>
          <div className='w-full flex flex-wrap'>
            <div className='w-full lg:w-[70%] 2xl:w-[65%]'>
              <div className='bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md'>
                <h2 className='text-slate-600 font-semibold pb-3 text-lg'>Thông tin vận chuyển</h2>
                <form onSubmit={placeOrder}>
                  <div className='w-full flex flex-col gap-4'>
                    <div>
                      <input onChange={inputHanler} name='name' value={state.name} className='w-full rounded-lg px-3 py-1 border border-[#d9d9d9] outline-none focus:border-[#99c6de] text-sm' type="text" placeholder='Họ và tên' />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-full'>
                      <div className='flex flex-col md:w-[70%]'>
                        <input onChange={inputHanler} name='email' value={state.email} className='w-full rounded-lg px-3 py-1 border border-[#d9d9d9] outline-none focus:border-[#99c6de] text-sm'
                          type="email" placeholder='Email' />
                      </div>
                      <div className='flex flex-col w-full md:w-[28%]'>
                        <input onChange={inputHanler} name='phone' value={state.phone} className='w-full rounded-lg px-3 py-1 border border-[#d9d9d9] outline-none focus:border-[#99c6de] text-sm'
                          type="text" placeholder='Số điện thoại' />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <input onChange={inputHanler} name='address' value={state.address} className='w-full rounded-lg px-3 py-1 border border-[#d9d9d9] outline-none focus:border-[#99c6de] text-sm' type="text" placeholder='Địa chỉ' />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-full '>
                      <div className='w-full md:w-[30%] '>
                        <select onChange={handleProvice} className='w-full px-3 py-1 border border-[#d9d9d9] rounded-lg  outline-none focus:border-[#99c6de] cursor-pointer text-sm'>
                          <option value="">Chọn Tỉnh / Thành phố</option>
                          {
                            provinces.map((p) => (
                              <option key={p.code} value={p.code}>{p.name}</option>
                            ))
                          }
                        </select>
                        {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                      </div>
                      <div className='w-full md:w-[30%]'>
                        <select onChange={handleDistrict} className='w-full px-3 py-1 border border-[#d9d9d9] rounded-lg  outline-none focus:border-[#99c6de] cursor-pointer text-sm'>
                          <option value="">Chọn Quận / Huyện</option>
                          {
                            districts.map(d => (
                              <option key={d.code} value={d.code}>{d.name}</option>
                            ))
                          }
                        </select>
                        {errors.district && <p className="text-red-500 text-xs mt-1 ">{errors.district}</p>}
                      </div>

                      <div className='w-full md:w-[30%]'>
                        <select onChange={handlerWard} className='w-full px-3 py-1 border border-[#d9d9d9] rounded-lg outline-none focus:border-[#99c6de] cursor-pointer text-sm'>
                          <option value="">Chọn Phường / Xã</option>
                          {
                            wards.map(w => (
                              <option key={w.code} value={w.code}>{w.name}</option>
                            ))
                          }
                        </select>
                        {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward}</p>}
                      </div>

                    </div>
                    <div className='flex justify-end items-center mt-4'>
                      <button className='w-full md:w-[30%] px-1 py-2 bg-red-500 text-white rounded-md font-medium text-sm cursor-pointer whitespace-nowrap'>Phương thức thanh toán</button>
                    </div>

                  </div>
                </form>
              </div>
              {
                products.map((p, i) => <div key={i} className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2 rounded-lg shadow-md mt-5'>
                  <div className='flex justify-start items-center'>
                    <h2 className='text-base text-slate-600 font-bold'>{p.shopName}</h2>
                  </div>
                  {
                    p.products.map((item, i) => <div key={i} className='w-full flex flex-wrap '>
                      <div className='flex w-full sm:w-7/12 gap-2 '>
                        <div className='flex gap-4 justify-start items-center'>
                          <img className='w-20 h-20' src={item.productInfo.images[0]} alt="product" />
                          <div>
                            <h2 className='font-bold text-sm text-slate-600'>{item.productInfo.name}</h2>
                            <span className='text-xs text-slate-600'>Thương hiệu: {item.productInfo.brand}</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex w-full sm:w-5/12 mt-3 sm:mt-0 justify-end'>
                        {
                          item.productInfo.discount > 0
                            ?
                            <div className='pl-0 sm:pl-4'>
                              <h2 className='font-bold text-sm text-red-500'>
                                {formatPrice(item.productInfo.price - (item.productInfo.price * item.productInfo.discount) / 100)}
                              </h2>
                              <p className='text-gray-400 line-through text-xs'>{formatPrice(item.productInfo.price)}</p>
                              <p className='text-red-500 font-medium text-xs'> -{item.productInfo.discount}%</p>
                            </div>
                            :
                            <div className='pl-0 sm:pl-4'>
                              <h2 className='font-bold text-sm text-red-500'>
                                {formatPrice(item.productInfo.price)}
                              </h2>
                            </div>
                        }
                      </div>
                      <div className='w-full h-px border border-[#e9ebf0] mx-auto my-2'></div>
                    </div>)
                  }
                </div>)
              }
            </div>
            <div className='w-full lg:w-[30%]'>
              <div className='pl-0 lg:pl-3 mt-5 lg:mt-0'>
                {
                  <div className='bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md flex flex-col gap-4'>
                    <h2 className='font-bold text-base text-slate-600'>Đơn hàng</h2>
                    <div className='flex justify-between items-center text-sm'>
                      <span>Tổng tiền hàng</span>
                      <span>{formatPrice(price)}</span>
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                      <span>Phí vận chuyển</span>
                      <span>{formatPrice(shipping_fee)}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm'>Tổng tiền</span>
                      <span className='font-semibold text-red-500 text-base'>{formatPrice(price + shipping_fee)}</span>
                    </div>
                  </div>
                }
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;