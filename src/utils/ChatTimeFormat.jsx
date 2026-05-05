import moment from 'moment';

export const isSameSender = (current, prev) => {
  return prev && prev.senderId === current.senderId;
};

export const isFirstInGroup = (messages, i) => {
  if (i === 0) return true;
  return messages[i - 1].senderId !== messages[i].senderId;
};

export const isLastInTimeGroup = (messages, i) => {
  if (i === messages.length - 1) return true;

  const current = messages[i];
  const next = messages[i + 1];

  const diff = moment(next.createdAt).diff(moment(current.createdAt), 'minutes');
  return diff >= 10;
};

// 🔥 hiển thị ngày (Hôm nay, Hôm qua)
export const shouldShowDate = (current, prev) => {
  if (!prev) return true;
  return !moment(current.createdAt).isSame(prev.createdAt, 'day');
};

export const formatDateLabel = (date) => {
  const m = moment(date);

  if (m.isSame(moment(), 'day')) return 'Hôm nay';
  if (m.isSame(moment().subtract(1, 'day'), 'day')) return 'Hôm qua';

  return m.format('DD/MM/YYYY');
};