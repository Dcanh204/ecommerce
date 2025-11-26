import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../stores/reducers/authReducers';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)
  const [showPass, setShowPass] = useState(false)
  const [state, setState] = useState({
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
  const login = (e) => {
    e.preventDefault();
    dispatch(customer_login(state))
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear())
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear())
    }
    if (userInfo) {
      navigation('/')
    }
  }, [successMessage, errorMessage, dispatch, userInfo, navigation])
  return (
    <div>
      <Header />
      <section className='pt-35 h-screen sm:pt-30 lg:pt-50 bg-[#eeeeee]'>
        <div className='w-full justify-center items-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-[90%]  md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto bg-white rounded-lg'>
            <div className='px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Đăng nhập</h2>
              <div>
                <form onSubmit={login} className='text-slate-600'>
                  <div className='flex flex-col gap-1 mb-3'>
                    <label className='font-medium' htmlFor="email">Email</label>
                    <input onChange={inputHandle} value={state.email} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="email" placeholder='Email' id='email' name='email' required />
                  </div>
                  <div className='flex flex-col gap-1 mb-3 relative'>
                    <label className='font-medium' htmlFor="password">Mật khẩu</label>
                    <input onChange={inputHandle} value={state.password} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md pr-10' type={`${showPass ? 'text' : 'password'}`} placeholder='Mật khẩu' id='password' name='password' required />
                    {
                      showPass ?
                        <span onClick={() => setShowPass(!showPass)} className='cursor-pointer absolute right-3 top-10'><FaEyeSlash /></span>
                        :
                        <span onClick={() => setShowPass(!showPass)} className='cursor-pointer absolute right-3 top-10'><FaEye /></span>
                    }

                  </div>
                  <div className='flex justify-center items-center mt-6'>
                    <button disabled={loading} className='w-full px-10 py-2 bg-[#059473] text-white rounded-md cursor-pointer'>
                      {
                        loading ? <ClipLoader color='white' /> : 'Đăng nhập'
                      }
                    </button>
                  </div>
                </form>
                <div className='flex justify-center items-center my-3'>
                  <div className='h-px w-[95%] bg-slate-200'></div>
                  <div className='px-3 text-sm text-slate-600'>Hoặc</div>
                  <div className='h-px w-[95%] bg-slate-200'></div>
                </div>
                <div className='flex justify-center items-center gap-3'>
                  <button type='button' className='w-[50%] h-[35px] flex justify-center items-center bg-orange-700 rounded-md cursor-pointer hover:shadow-orange-700/50 shadow-lg overflow-hidden text-white'>
                    <span></span><FaGoogle />
                  </button>
                  <button type="button" className='text-white w-[50%] h-[35px] flex justify-center items-center bg-blue-700 rounded-md cursor-pointer hover:shadow-blue-700/50 shadow-lg overflow-hidden'>
                    <FaFacebook />
                  </button>
                </div>
                <div className='flex justify-center items-center gap-3 mt-4'>
                  <p className='text-sm'>Bạn chưa có tài khoản ? </p>
                  <Link to='/register' className='cursor-pointer text-blue-500 font-medium text-sm'>Đăng Ký</Link>
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

export default Login;