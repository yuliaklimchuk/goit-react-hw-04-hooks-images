import style from './imageGalleryItem.module.css'
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => { 
    return (
        <li className={style.galleryItem}>
            <img src={ webformatURL} alt={largeImageURL} className={ style.image}/>
        </li>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}