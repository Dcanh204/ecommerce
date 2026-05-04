
import { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import io from 'socket.io-client';
import { add_friend, get_friends, send_message } from '../../stores/reducers/chatReducers';
const socket = io(import.meta.env.VITE_SOCKET_URL);
console.log(import.meta.env.VITE_SOCKET_URL)

import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

const shouldShowTime = (current, prev) => {
  if (!prev) return true;
  const diff = moment(current.createdAt).diff(moment(prev.createdAt), 'minutes');
  return diff >= 10;
};

const isSameSender = (current, prev) => {
  return prev && prev.senderId === current.senderId;
};

const isLastInGroup = (messages, i) => {
  return i === messages.length - 1 || messages[i + 1].senderId !== messages[i].senderId;
};

const isLastInTimeGroup = (messages, i) => {
  if (i === messages.length - 1) return true;

  const current = messages[i];
  const next = messages[i + 1];

  const diff = moment(next.createdAt).diff(moment(current.createdAt), 'minutes');

  return diff >= 10;
};

const Chat = () => {
  const dispatch = useDispatch()
  const { sellerId } = useParams();
  const { userInfo } = useSelector(state => state.auth);
  const { messages, my_friends, current_friend } = useSelector(state => state.chat);
  const [text, setText] = useState('')
  const messageEndRef = useRef(null);
  useEffect(() => {
    socket.emit('add_user', userInfo.id, userInfo)
  }, [userInfo])
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(get_friends(userInfo.id));
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (sellerId && userInfo?.id) {
      dispatch(add_friend({
        sellerId,
        userId: userInfo.id
      }))
    }
  }, [sellerId, userInfo, dispatch])

  const sendMessage = () => {
    if (text) {
      dispatch(send_message({
        userId: userInfo.id,
        text,
        sellerId,
        name: userInfo.name
      }))
      setText('')
    }
  }
  return (
    <div className='bg-white p-3 rounded-md'>
      <div className='w-full flex'>
        <div className='w-[230px]'>
          <div className='flex justify-center gap-3 items-center text-slate-600 text-lg h-[50px]'>
            <span><AiOutlineMessage /></span>
            <span>Tin nhắn</span>
          </div>
          <div className='w-full flex flex-col text-slate-600 py-3 h-[400px] pr-3'>
            {
              my_friends.map((f, i) => <Link to={`/dashboard/chat/${f.fdId}`} key={i} className={`flex gap-2 justify-start items-center pl-2 py-[5px]`} >
                <div className='w-[30px] h-[30px] rounded-full relative'>
                  <div className='w-2.5 h-2.5 rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                  <img src={f.image} alt="" />
                </div>
                <span className='text-sm'>{f.name}</span>
              </Link>)
            }
          </div>
        </div>
        <div className='w-[calc(100%-230px)]'>
          {
            current_friend ? <div className='w-full h-full'>
              <div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
                <div className='w-[30px] h-[30px] rounded-full relative'>
                  <div className='w-2.5 h-2.5 rounded-full bg-green-500 absolute right-0 bottom-0'></div>

                  <img src={current_friend.image} alt="" />
                </div>
                <div>
                  <h6 className='text-sm'>{current_friend.name}</h6>
                  <p className='text-[10px] text-slate-400'>Đang hoạt động</p>
                </div>
              </div>
              <div className='h-[400px] w-full bg-slate-100 rounded-md '>
                <div className='w-full h-full overflow-y-auto flex flex-col gap-3 px-1 py-1 custom-scrollbar'>
                  {
                    messages.map((m, i) => {
                      const prev = messages[i - 1];
                      const showDivider = shouldShowTime(m, prev);
                      const sameSender = isSameSender(m, prev);
                      const lastInGroup = isLastInGroup(messages, i);
                      const lastInTimeGroup = isLastInTimeGroup(messages, i);
                      const isMe = m.senderId === userInfo.id;

                      return (
                        <div key={i}>

                          {/* 🕒 TIME (giữa) */}
                          {showDivider && (
                            <div className="w-full flex justify-center my-2">
                              <span className="text-[11px] text-gray-500 bg-gray-200 px-3 py-0.5 rounded-full">
                                {moment(m.createdAt).format('HH:mm DD/MM/YYYY')}
                              </span>
                            </div>
                          )}


                          <div className={`w-full flex ${isMe ? 'justify-end' : 'justify-start'}`}>

                            {!isMe && lastInGroup && (
                              <img
                                className="w-7 h-7 rounded-full mr-2 self-end"
                                src={current_friend?.image || "http://localhost:3000/images/user.png"}
                                alt=""
                              />
                            )}

                            <div className="flex flex-col max-w-[60%]">

                              <div className={`px-3 py-2 text-xs shadow ${isMe
                                ? 'bg-blue-500 text-white rounded-2xl rounded-br-sm'
                                : 'bg-white text-black rounded-2xl rounded-bl-sm'
                                } ${sameSender ? 'mt-0.25' : 'mt-2'}`}
                              >
                                {m.message}
                              </div>

                              {!showDivider && lastInTimeGroup && (
                                <span className={`text-[10px] text-gray-400 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                                  {moment(m.createdAt).format('HH:mm')}
                                </span>
                              )}

                            </div>
                          </div>
                        </div>
                      );
                    })
                  }

                  <div ref={messageEndRef}></div>


                </div>
              </div>
              <div className='flex p-2 justify-between items-center w-full'>
                <div className='w-2.5 h-2.5 border-[#c4d3e4] border p-2 justify-center items-center flex rounded-full'>
                  <label className='cursor-pointer text-[#b8c6d5]' htmlFor=""><AiOutlinePlus /></label>
                  <input className='hidden' type="file" />
                </div>
                <form className='w-full flex gap-4 justify-end'>
                  <div className='border border-[#e1e8f0] h-10 p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      type="text"
                      placeholder="Aa"
                      className="w-full rounded-full h-full outline-none p-3"
                    />
                    <div className='text-2xl right-2 top-2 absolute cursor-auto'>
                      <span className='text-[#e1e8f0]'><GrEmoji /></span>
                    </div>
                  </div>
                  <div className='w-10 p-2 justify-center items-center rounded-full'>
                    <div onClick={sendMessage} className={`text-2xl cursor-pointer ${text ? 'text-black' : 'text-[#b8c6d5]'}`}>
                      <IoSend />
                    </div>
                  </div>
                </form>
              </div>
            </div>
              : <div className='w-full h-full flex flex-col justify-center items-center text-slate-600 gap-4'>
                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-slate-100 shadow-inner'>
                  <AiOutlineMessage className='text-4xl text-slate-400' />
                </div>
                <h2 className='text-xl font-semibold text-slate-700'>
                  Chưa có cuộc trò chuyện
                </h2>
                <p className='text-sm text-slate-400 text-center max-w-[300px]'>
                  Hãy chọn người bán ở bên trái để bắt đầu nhắn tin và nhận hỗ trợ nhanh chóng.
                </p>

              </div>
          }

        </div>
      </div>
    </div >
  );
};

export default Chat;