import React, { Component } from "react";
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

export class App extends Component { 
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
