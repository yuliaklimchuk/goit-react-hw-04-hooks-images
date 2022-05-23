import { useState } from "react";
import {toast } from 'react-toastify';
import style from './searchbar.module.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) { 
    const [imageName, setImageName] = useState('');

    const handleInputChange = (event) => { 
        setImageName(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        if (imageName.trim() === '') { 
            toast.error('Empty input field!');
            return;
        }
        onSubmit(imageName);
        setImageName('');
    }

    return <header className={style.searchbar}>
            <form className={style.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={style.button}>
                    <span className={style.label}>Search</span>
                </button>

                <input
                    className={style.input}
                    type="text"
                    name="imageName"
                    value={imageName}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
            </header>
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};