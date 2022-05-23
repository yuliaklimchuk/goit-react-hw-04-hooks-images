import React, { Component, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './app.module.css';
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { Modal } from "./Modal";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25800481-71cffbd2e779364a85bf72062';

export function App() { 
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState(null);

  useEffect(() => { 
      if (!imageName) { 
        return;
      }
        setTimeout(() => {
          fetch(`${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(
                new Error('Images not found. Please enter a valid value'),
              );
            })
            .then(imagesRes => {
              if (imagesRes.hits.length === 0) {
                return Promise.reject(
                new Error('Images not found. Please enter a valid value'),
              );
              }
              return setImages([...images, ...imagesRes.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }))] );
            })
            .catch((error) => fetchError(error))
            .finally(() => setLoading(false ))
        }, 1000);
        
  }, [imageName, page]);

  const handleFormSubmit = (imageName) => { 
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setLoading(true);
  }

  const fetchError = (error) => { 
    setImages([]);
    setError(error);
    toast.error(error.message);
  }

  const handleButton = () => {
    setLoading(true);
    setPage(page+1);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleForModal = event => {
    setLargeImg(event.target.alt);
    toggleModal();
  };

  return (
      <div className={ style.app}>
        <ToastContainer />
        <Searchbar onSubmit={handleFormSubmit} />
        {(images.length !== 0) && <ImageGallery images={images} onClick={handleForModal}/>}
        { loading && <Loader />}
        {(images.length !== 0) && <Button handleButton={handleButton} />}
        {showModal &&<Modal largeImg={largeImg} onClose={toggleModal} />}
      </div>
    )
}

export class OldApp extends Component { 
  state = {
    imageName: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImg: null
  }
  componentDidUpdate(prevProps, prevStates) { 
    const nextName = this.state.imageName;
    const nextPage = this.state.page;
    if (prevStates.imageName !== nextName || prevStates.page !== nextPage) {
      if (prevStates.imageName !== nextName) { 
      this.setState({
        images: [],
        loading: true
      });
    }
        setTimeout(() => {
          fetch(`${BASE_URL}?q=${nextName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(
                new Error('Images not found. Please enter a valid value'),
              );
            })
            .then(images => {
              if (images.hits.length === 0) {
                return Promise.reject(
                new Error('Images not found. Please enter a valid value'),
              );
              }
              return this.setState(prev => ({ images: [...prev.images,...images.hits.map(({id, webformatURL, largeImageURL })=>({id,webformatURL,largeImageURL}))]}) );
            })
            .catch((error) => this.fetchError(error))
            .finally(() => this.setState({ loading: false }))
        }, 1000);
        }
    }
  handleFormSubmit = (imageName) => { 
    this.setState({
      imageName: imageName,
    page: 1});
  }
  fetchError = (error) => { 
    this.setState({
      images: [],
      error: error
    })
    toast.error(error.message);
  }
  handleButton = () => {
    this.setState(prev => ({
      loading: true,
      page: prev.page + 1
    }));
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handleForModal = event => {
    this.setState({ largeImg: event.target.alt });
    this.toggleModal();
  };
  render() { 
    const {images, loading, largeImg, showModal } = this.state;
    return (
      <div className={ style.app}>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {(images.length !== 0) && <ImageGallery images={images} onClick={this.handleForModal}/>}
        { loading && <Loader />}
        {(images.length !== 0) && <Button handleButton={this.handleButton} />}
        {showModal &&<Modal largeImg={largeImg} onClose={this.toggleModal} />}
      </div>
    )
  }
}
