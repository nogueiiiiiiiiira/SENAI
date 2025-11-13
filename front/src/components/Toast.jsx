import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ show, message, type = 'success', onClose, delay = 3000 }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        show={visible}
        onClose={handleClose}
        delay={delay}
        autohide
        bg={getBgColor()}
      >
        <Toast.Header>
          <strong className="me-auto">Notificação</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
