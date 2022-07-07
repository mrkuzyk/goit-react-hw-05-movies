import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css'

const  SearchBar = ({onSubmit}) => {
    const [moviesName, setMoviesName] = useState('');

    const handleNameChange = (e) => {
        setMoviesName(e.currentTarget.value.toLowerCase()) // стейт приймає значення з інпут
    };

    const handleSubmit = e => {
        e.preventDefault();

        // якщо пошук пустий, то помилку викидаю
        if (moviesName.trim() === '') {
            alert('Ще раз таке зробиш, і я викличу поліцію');
            return
        };
        
        onSubmit(moviesName); // onSubmit це назва пропсів, а не слухач подій
        setMoviesName(''); // очищую стейт
    };

    return (
        <header className={s.searchbar}>
            <form onSubmit={ handleSubmit} className={s.searchForm}>
                    <button
                        type="submit"
                        className={s.button}
                    >
                        <span className={s.buttonLabel}>Search</span>
                    </button>

                <label>
                    <input
                        className={s.input}
                        name="moviesName"
                        type="text"
                        value={moviesName}
                        onChange={handleNameChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movies"
                    />
                </label>
            </form>
        </header>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
};