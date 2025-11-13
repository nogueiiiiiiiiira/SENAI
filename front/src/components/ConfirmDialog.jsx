import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({
  show,
  title = 'Confirmar Ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  loading = false
}) => {
  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processando...
            </>
          ) : (
            confirmText
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
