import style from './modal.module.css';
import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")

export function Modal({ onClose, largeImg }) {
    const handleKeyDown = event => {
        if (event.code === "Escape") {
        onClose();
        }
    };
    const handleForCloseModal = event => {
        if (event.currentTarget === event.target) {
        onClose();
        }
    };
    useEffect(() => { 
        window.addEventListener('keydown', handleKeyDown);
        return () => { 
            window.removeEventListener('keydown', handleKeyDown);
        }
    })

    return createPortal(<div className={style.overlay} onClick={handleForCloseModal}>
            <div className={style.modal}>
            <img src={largeImg} alt="photoImg" />
            </div>
        </div>, modalRoot);
}
    
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired
};