import { useSearchParams } from 'react-router-dom';
import s from './SearchBar.module.css'

const  SearchBar = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    let input = '';

    // console.log(query)
    const handleNameChange = (e) => {
        input = e.currentTarget.value.toLowerCase() // значення з інпут
        // console.log(input);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget; // форма
        // console.log(form);

        // якщо пошук пустий, то помилку викидаю
        if (input.trim() === '') {
            alert('Ще раз таке зробиш, і я викличу поліцію');
            return
        };
        
        setSearchParams({ query: input}) // зберігаю запит в парамс
        form.reset(); // очищую форму
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
                        name="name"
                        type="text"
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