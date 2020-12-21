import { Modal } from 'antd';

const confirmAction = ({ action, message, okText, icon, okButtonProps }) => {
  Modal.confirm({
    content: message,
    onOk: action,
    okText,
    icon,
    okButtonProps,
    cancelButtonProps: { type: 'link' },
  });
};

const confirmDelete = (message, action) => {
  confirmAction({
    action() {
      action();
    },
    message,
    okText: 'Eliminar',
    icon: null,
    okButtonProps: { type: 'danger' },
  });
};

export { confirmDelete };
