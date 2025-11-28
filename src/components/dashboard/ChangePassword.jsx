import React from 'react';

const ChangePassword = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
      <h2 className='text-base font-medium mb-4'>Cập nhật mật khẩu</h2>
      <form>
        <div className='flex flex-col gap-1 mb-2 text-xs'>
          <label htmlFor="old_passowrd">Mật khẩu cũ</label>
          <input className='outline-none px-3 py-1 text-slate-600 border border-slate-300 rounded-md' type="password" id='old_passowrd' name='old_password' placeholder='Mật khẩu cũ' />
        </div>

        <div className='flex flex-col gap-1 mb-2 text-xs'>
          <label htmlFor="new_password">Mật khẩu mới</label>
          <input className='outline-none px-3 py-1 text-slate-600 border border-slate-300 rounded-md' type="password" id='new_password' name='new_password' placeholder='Mật khẩu mới' />
        </div>

        <div className='flex flex-col gap-1 mb-2 text-xs'>
          <label htmlFor="confirm_passowrd">Xác nhận mật khẩu</label>
          <input className='outline-none px-3 py-1 text-slate-600 border border-slate-300 rounded-md' type="password" id='confirm_passowrd' name='confirm_passowrd' placeholder='Nhập lại mật khẩu mới' />
        </div>

        <button className='px-5 py-1 text-sm text-white bg-green-500 rounded-md mt-5'>Cập nhật</button>
      </form>
    </div>
  );
};

export default ChangePassword;