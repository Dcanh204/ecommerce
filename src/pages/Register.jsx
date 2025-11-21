import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Register = () => {
  const [showPass, setShowPass] = useState(false)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }
  const register = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <Header />
      <section className='pt-35 h-screen sm:pt-30 lg:pt-50 bg-[#eeeeee]'>
        <div className='w-full justify-center items-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-[90%]  md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto bg-white rounded-lg'>
            <div className='px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Đăng ký</h2>
              <div>
                <form onSubmit={register} className='text-slate-600'>
                  <div className='flex flex-col gap-1 mb-3'>
                    <label className='font-medium' htmlFor="name">Họ và tên</label>
                    <input onChange={inputHandle} value={state.name} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="text" placeholder='Họ và tên' id='name' name='name' required />
                  </div>
                  <div className='flex flex-col gap-1 mb-3'>
                    <label className='font-medium' htmlFor="email">Email</label>
                    <input onChange={inputHandle} value={state.email} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="email" placeholder='Email' id='email' name='email' required />
                  </div>
                  <div className='flex flex-col gap-1 mb-3 relative'>
                    <label className='font-medium' htmlFor="password">Mật khẩu</label>
                    <input onChange={inputHandle} value={state.password} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md pr-10' type={`${showPass ? 'text' : 'password'}`} placeholder='Mật khẩu' id='password' name='password' required />
                    <span onClick={() => setShowPass(!showPass)} className='cursor-pointer absolute right-3 top-10'><FaEye /></span>
                  </div>
                  <div className='flex justify-center items-center mt-6'>
                    <button className='px-10 py-2 bg-[#059473] text-white rounded-md cursor-pointer'>Đăng ký</button>
                  </div>
                </form>
                <div className='flex justify-center items-center my-3'>
                  <div className='h-px w-[95%] bg-slate-200'></div>
                  <div className='px-3 text-slate-600'>Hoặc</div>
                  <div className='h-px w-[95%] bg-slate-200'></div>
                </div>
                <div className='flex justify-center items-center gap-3'>
                  <p>Bạn đã có tài khoản ? </p>
                  <Link to='/login' className='cursor-pointer text-blue-500 font-medium'>Đăng nhập</Link>
                </div>
              </div>
            </div>
            <div className='hidden md:block w-full h-full py-4 pr-4'>
              <img className='w-full h-full' src="/images/login.jpg" alt="login" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Register;