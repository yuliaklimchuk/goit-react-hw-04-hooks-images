import style from './imageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";


export const ImageGallery = ({ images, onClick})=>{ 
    return (
        <ul className={style.gallery} onClick={onClick}> 
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} />
            ))}
    </ul>);
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })),
    onClick:PropTypes.func.isRequired
};