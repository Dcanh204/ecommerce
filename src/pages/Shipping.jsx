import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';

const Shipping = () => {

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








  const save = (e) => {
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

    // Nếu không có lỗi → xử lý submit
    if (Object.keys(formErrors).length === 0) {
      console.log("Submit OK", state);
      // navigate sang trang thanh toán hoặc gọi API
    }
  }
  console.log(state)

  return (
    <div>
      <Header />
      <section className='pt-35 pb-25 sm:pt-30 lg:pt-40 md:bg-[#eeeeee]'>
        <div className='w-[90%] border mx-auto border-[#e9ebf0] mb-10'></div>
        <div className='w-[90%] xl:w-[70%] mx-auto py-16'>
          <div className='w-full flex flex-wrap'>
            <div className='w-full lg:w-[70%] 2xl:w-[65%]'>
              <div className='bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md'>
                <h2 className='text-slate-600 font-semibold pb-3 text-xl'>Thông tin vận chuyển</h2>
                <form onSubmit={save}>
                  <div className='w-full flex flex-col gap-4'>
                    <input onChange={inputHanler} name='name' value={state.name} className='w-full rounded-lg px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#99c6de]' type="text" placeholder='Họ và tên' />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-full'>
                      <div className='flex flex-col md:w-[70%]'>
                        <input onChange={inputHanler} name='email' value={state.email} className='w-full rounded-lg px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#99c6de]'
                          type="email" placeholder='Email' />
                      </div>
                      <div className='flex flex-col w-full md:w-[28%]'>
                        <input onChange={inputHanler} name='phone' value={state.phone} className='w-full rounded-lg px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#99c6de]'
                          type="text" placeholder='Số điện thoại' />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <input onChange={inputHanler} name='address' value={state.address} className='w-full rounded-lg px-3 py-2 border border-[#d9d9d9] outline-none focus:border-[#99c6de]' type="text" placeholder='Địa chỉ' />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-full '>
                      <div className='w-full md:w-[30%] '>
                        <select onChange={handleProvice} className='w-full px-3 py-2 border border-[#d9d9d9] rounded-lg  outline-none focus:border-[#99c6de] cursor-pointer'>
                          <option value="">Chọn Tỉnh / Thành phố</option>
                          {
                            provinces.map((p) => (
                              <option key={p.code} value={p.code}>{p.name}</option>
                            ))
                          }
                        </select>
                        {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                      </div>
                      <div className='w-full md:w-[30%]'>
                        <select onChange={handleDistrict} className='w-full px-3 py-2 border border-[#d9d9d9] rounded-lg  outline-none focus:border-[#99c6de] cursor-pointer'>
                          <option value="">Chọn Quận / Huyện</option>
                          {
                            districts.map(d => (
                              <option key={d.code} value={d.code}>{d.name}</option>
                            ))
                          }
                        </select>
                        {errors.district && <p className="text-red-500 text-sm mt-1 ">{errors.district}</p>}
                      </div>

                      <div className='w-full md:w-[30%]'>
                        <select onChange={handlerWard} className='w-full px-3 py-2 border border-[#d9d9d9] rounded-lg outline-none focus:border-[#99c6de] cursor-pointer'>
                          <option value="">Chọn Phường / Xã</option>
                          {
                            wards.map(w => (
                              <option key={w.code} value={w.code}>{w.name}</option>
                            ))
                          }
                        </select>
                        {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>}
                      </div>

                    </div>
                    <div className='flex justify-end items-center mt-4'>
                      <button className='w-full md:w-[40%] px-3 py-2 bg-red-500 text-white rounded-md font-semibold text-lg cursor-pointer whitespace-nowrap'>Phương thức thanh toán</button>
                    </div>

                  </div>
                </form>
              </div>
              {
                [1, 2].map((p, i) => <div key={i} className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2 rounded-lg shadow-md mt-5'>
                  <div className='flex justify-start items-center'>
                    <h2 className='text-base text-slate-600 font-bold'>Thế giới di động</h2>
                  </div>
                  {
                    [1, 2].map((item, i) => <div key={i} className='w-full flex flex-wrap '>
                      <div className='flex w-full sm:w-7/12 gap-2 '>
                        <div className='flex gap-4 justify-start items-center'>
                          <img className='w-20 h-20' src={`images/products/${i + 1}.webp`} alt="product" />
                          <div>
                            <h2 className='font-bold text-lg text-slate-600'>Product name</h2>
                            <span className='text-sm text-slate-600'>Brand: Apple</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex w-full sm:w-5/12 mt-3 sm:mt-0 justify-end'>
                        <div className='pl-0 sm:pl-4'>
                          <h2 className='font-bold text-lg text-red-500'>1.800.000₫</h2>
                          <p className='text-gray-400 line-through text-base'>2.000.000₫</p>
                          <p className='text-red-500 font-medium text-base'> -10%</p>
                        </div>

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
                    <h2 className='font-bold text-xl text-slate-600'>Đơn hàng</h2>
                    <div className='flex justify-between items-center'>
                      <span>Tổng tiền hàng</span>
                      <span>3.600.000₫</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Phí vận chuyển</span>
                      <span>40.000₫</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Tổng tiền</span>
                      <span className='font-semibold text-red-500 text-lg'>3.640.000₫</span>
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