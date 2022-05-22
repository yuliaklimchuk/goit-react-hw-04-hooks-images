import { Component } from "react";
import {toast } from 'react-toastify';
import style from './searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
    state = { 
        imageName: '',
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }
    handleInputChange = (event) => { 
        this.setState({imageName: event.currentTarget.value.toLowerCase()});
    }
    handleSubmit = (event) => { 
        event.preventDefault();
        const { imageName } = this.state;
        if (imageName.trim() === '') { 
            toast.error('Empty input field!');
            return;
        }
        this.props.onSubmit(imageName);
        this.setState({ imageName: ''});
    }
    render() { 
        const { imageName } = this.state;
        return <header className={style.searchbar}>
            <form className={style.searchForm} onSubmit={ this.handleSubmit}>
                <button type="submit" className={style.button}>
                    <span className={style.label}>Search</span>
                </button>

                <input
                    className={style.input}
                    type="text"
                    name="imageName"
                    value={imageName}
                    onChange={this.handleInputChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
            </header>
    }
}