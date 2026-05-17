import { useEffect, useRef, useState, useContext } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import { SocketContext } from '../../App';

import {
  isSameSender,
  isFirstInGroup,
  isLastInTimeGroup,
  shouldShowDate,
  formatDateLabel
} from '../../utils/ChatTimeFormat';

import {
  add_friend,
  get_friends,
  messageClear,
  send_message,
  updateMessage
} from '../../stores/reducers/chatReducers';
import toast from 'react-hot-toast';

moment.locale('vi');

const Chat = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();

  const { userInfo } = useSelector(state => state.auth);
  const { messages, my_friends, current_friend, successMessage, activeSellers } = useSelector(state => state.chat);
  const socket = useContext(SocketContext);

  const [text, setText] = useState('');
  const messageEndRef = useRef(null);
  const [receiverMessage, setReceiverMessage] = useState('');

  // AUTO SCROLL
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // LOAD FRIENDS
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(get_friends(userInfo.id));
    }
  }, [userInfo, dispatch]);

  // ADD FRIEND WHEN OPEN CHAT
  useEffect(() => {
    if (sellerId && userInfo?.id) {
      dispatch(add_friend({
        sellerId,
        userId: userInfo.id
      }));
    }
  }, [sellerId, userInfo, dispatch]);

  // SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    dispatch(send_message({
      userId: userInfo.id,
      text,
      sellerId,
      name: userInfo.name
    }));

    setText('');
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (msg) => {
      setReceiverMessage(msg);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  const isOnline = activeSellers.some(
    c => c.sellerId === current_friend.fdId
  );
  useEffect(() => {
    if (successMessage && socket) {
      socket.emit('send_customer_message', messages[messages.length - 1]);
      dispatch(messageClear())
    }
  }, [messages, successMessage, dispatch, socket])

  useEffect(() => {
    if (receiverMessage) {
      if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
        dispatch(updateMessage(receiverMessage))
      } else {
        toast.success(receiverMessage.senderName + " " + "Gửi một tin nhắn")
        dispatch(messageClear())
      }

    }
  }, [receiverMessage, dispatch, sellerId, userInfo.id])

  useEffect(() => {
    socket?.emit('request_active');
  }, [socket]);
  return (
    <div className='bg-white p-3 rounded-md'>
      <div className='w-full flex'>

        {/* LEFT SIDEBAR */}
        <div className='w-[230px]'>
          <div className='flex justify-center gap-3 items-center text-slate-600 text-lg h-[50px]'>
            <AiOutlineMessage />
            <span>Tin nhắn</span>
          </div>

          <div className='w-full flex flex-col text-slate-600 py-3 h-[400px] pr-3 overflow-y-auto'>
            {
              my_friends.map((f, i) => (
                <Link
                  to={`/dashboard/chat/${f.fdId}`}
                  key={i}
                  className='flex gap-2 items-center pl-2 py-[5px]'
                >
                  <div className='w-[30px] h-[30px] rounded-full relative'>
                    {
                      activeSellers.some(c => c.sellerId === f.fdId) && <div className='w-2.5 h-2.5 rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                    }
                    <img src={f.image ? f.image : '/images/user.png'} alt="" />
                  </div>
                  <span className='text-sm'>{f.name}</span>
                </Link>
              ))
            }
          </div>
        </div>

        {/* CHAT AREA */}
        <div className='w-[calc(100%-230px)]'>

          {
            current_friend ? (
              <div className='w-full h-full flex flex-col'>

                {/* HEADER */}
                <div className='flex gap-3 items-center text-slate-600 text-xl h-[50px]'>
                  <div className='w-[30px] h-[30px] rounded-full relative'>

                    {isOnline && (
                      <div className='w-2.5 h-2.5 rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                    )}

                    <img src={current_friend.image ? current_friend.image : '/images/user.png'} alt="" />
                  </div>

                  <div>
                    <h6 className='text-sm'>{current_friend.name}</h6>

                    <p className={`text-[10px] ${isOnline ? 'text-green-500' : 'text-slate-400'}`}>
                      {isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
                    </p>

                  </div>
                </div>

                {/* MESSAGES */}
                <div className='h-[400px] bg-slate-100 rounded-md'>
                  <div className='w-full h-full overflow-y-auto flex flex-col gap-1 px-2 py-2 custom-scrollbar'>

                    {
                      messages.map((m, i) => {
                        const prev = messages[i - 1];

                        const showDate = shouldShowDate(m, prev);
                        const sameSender = isSameSender(m, prev);
                        const lastInTime = isLastInTimeGroup(messages, i);
                        const firstInGroup = isFirstInGroup(messages, i);

                        const isMe = m.senderId === userInfo.id;

                        return (
                          <div key={i}>

                            {/* DATE */}
                            {showDate && (
                              <div className="w-full flex justify-center my-3">
                                <span className="text-[11px] text-gray-500 bg-gray-300 px-3 py-1 rounded-full">
                                  {formatDateLabel(m.createdAt)}
                                </span>
                              </div>
                            )}

                            <div className={`w-full flex ${isMe ? 'justify-end' : 'justify-start'}`}>

                              {/* AVATAR */}
                              {!isMe && (
                                firstInGroup ? (
                                  <img
                                    className="w-7 h-7 rounded-full mr-2 self-end"
                                    src={current_friend?.image}
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-7 mr-2"></div>
                                )
                              )}

                              {/* MESSAGE */}
                              <div className="flex flex-col max-w-[70%]">

                                <div
                                  className={`
                                    px-3 py-1 text-sm
                                    ${isMe
                                      ? 'bg-blue-500 text-white rounded-lg '
                                      : 'bg-gray-200 text-black rounded-lg'
                                    }
                                    ${sameSender ? 'mt-0.5' : 'mt-0.5'}
                                    max-w-fit
                                  `}
                                >
                                  {m.message}
                                </div>

                                {/* TIME */}
                                {!showDate && lastInTime && (
                                  <span className={`text-[10px] text-gray-400 mt-1 px-1 ${isMe ? 'text-right' : 'text-left'}`}>
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

                {/* INPUT */}
                <div className='flex p-2 items-center gap-2'>

                  <div className='w-9 h-9 border flex items-center justify-center rounded-full text-[#b8c6d5] cursor-pointer'>
                    <AiOutlinePlus />
                  </div>

                  <div className='flex-1 relative'>
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Aa"
                      className="w-full h-10 rounded-full px-4 outline-none border border-[#e1e8f0]"
                    />

                    <GrEmoji className='absolute right-3 top-2.5 text-gray-400' />
                  </div>

                  <div
                    onClick={sendMessage}
                    className={`text-2xl cursor-pointer ${text ? 'text-black' : 'text-gray-300'}`}
                  >
                    <IoSend />
                  </div>

                </div>

              </div>
            ) : (
              <div className='w-full h-full flex flex-col justify-center items-center text-slate-600 gap-4'>
                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-slate-100 shadow-inner'>
                  <AiOutlineMessage className='text-4xl text-slate-400' />
                </div>
                <h2 className='text-xl font-semibold text-slate-700'>
                  Chưa có cuộc trò chuyện
                </h2>
                <p className='text-sm text-slate-400 text-center max-w-[300px]'>
                  Hãy chọn người bán để bắt đầu nhắn tin
                </p>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};



export default Chat;