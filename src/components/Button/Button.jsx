import style from './button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleButton }) => { 
    return (
        <button type="button" className={ style.button} onClick={handleButton}>Load more</button>
    )
}

Button.propTypes = {
    handleButton: PropTypes.func.isRequired
};