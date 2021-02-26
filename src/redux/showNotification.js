import { notification } from 'antd';

notification.config({
  duration: 25,
  getContainer: () => document.getElementById('root'),
});

export default ({ type, message } = {}) => {
  if (type && message) notification[type]({ message });
};
