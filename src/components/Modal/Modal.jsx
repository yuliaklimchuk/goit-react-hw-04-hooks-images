import style from './modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")
export class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        largeImg: PropTypes.string.isRequired
    };
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown)
    };
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown)
    };
    handleKeyDown = event => {
        if (event.code === "Escape") {
        this.props.onClose();
        }
    };
    handleForCloseModal = event => {
        if (event.currentTarget === event.target) {
        this.props.onClose();
        }
    };
    render() {
        return createPortal(<div className={style.overlay} onClick={this.handleForCloseModal}>
            <div className={style.modal}>
            <img src={this.props.largeImg} alt="photoImg" />
            </div>
        </div>, modalRoot);
    }
}
