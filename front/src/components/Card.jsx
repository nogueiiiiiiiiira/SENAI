import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import style from './Card.module.css';

const Card = memo(({ title, imgSrc2, desc, value, id }) => {
  const maxDescLength = 100;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const renderDescription = () => {
    if (desc && desc.length > maxDescLength) {
      return desc.substring(0, maxDescLength) + '...';
    }
    return desc || 'Descrição não disponível';
  };

  return (
    <div className={style.wrapCard}>
      <div className={style.Card}>
        <h3 className={style.cardTitle}>{title || 'Título Desconhecido'}</h3>
        <img
          className={style.img2}
          src={imgSrc2 || 'https://via.placeholder.com/150'}
          alt={title || 'Book cover'}
          width={150}
          height="auto"
          loading="lazy"
        />
        <br />
        <div className={style.cardBody}>
          <p className={style.cardText}>{renderDescription()}</p>
          <p>{value || 'Sem informação adicional'}</p>
          <Button variant="primary" onClick={handleShowModal}>
            Ver mais
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title || 'Título Desconhecido'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src={imgSrc2 || 'https://via.placeholder.com/150'}
              alt={title || 'Book cover'}
              className="img-fluid mb-3 rounded"
              style={{ maxHeight: '300px' }}
            />
            <p className="text-muted">{desc || 'Descrição não disponível'}</p>
            {value && <p className="fw-bold">{value}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

Card.propTypes = {
  title: PropTypes.string,
  imgSrc2: PropTypes.string,
  desc: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Card.defaultProps = {
  title: 'Título Desconhecido',
  imgSrc2: 'https://via.placeholder.com/150',
  desc: 'Descrição não disponível',
  value: 'Sem informação adicional',
};

Card.displayName = 'Card';

export default Card;
