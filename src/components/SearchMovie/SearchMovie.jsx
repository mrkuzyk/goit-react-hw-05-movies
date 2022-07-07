import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import s from './SearchMovie.module.css';
import SearchBar from "components/SearchBar/SearchBar";
import ListMovies from "components/ListMovies/ListMovies";
import { StartSearch, MovieNotFound, ErrorMessage } from '../MessageTitle/MessageTitle';
// import Loader from '../Loader/Loader';

const SearchMovie = () => {
    const [moviesName, setMoviesName] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [totalMovies, setTotalMovies] = useState(null);

    const handleFormSubmit = moviesName => {
        setMoviesName(moviesName);
    };

    // _scrollToTop() {
    //     let scroll = document.getElementById('toScroll');
    //     scroll.scrollTop = 0;
    // }

    useEffect(() => {
        //щоб не рендилося одразу при завантажені , роблю перевірку на те чи є запит
        if (!moviesName) {
            return
        }

        // _scrollToTop();
        // setLoader(true); // включаю лоадер
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=6498bc448a014b6e9c7e74504ab1fe83&language=en-US&query=${moviesName}&page=1&include_adult=true`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject (
                        new Error(`Не знайдено фільмів з ім'ям ${moviesName}. Перезавантажте сторінку і спробуйте ще раз!`)
                    )
                })
            .then(movies => {
                // console.log(movies);
                setMovies(movies.results);
                setTotalMovies(movies.total_results)
                    // setLoader(false); // виключаю лоадер після загрузки
            })
            .catch(error =>{
                setError(error);
                // setLoader(false);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[moviesName]);

    return (
        <div className="container">
            <SearchBar
                onSubmit={handleFormSubmit} // onSubmit це пропси, а не слухач подій
            />
            {!moviesName && <StartSearch/>}
            {totalMovies === 0 && 
                <MovieNotFound
                    name={moviesName}
                />
            }
            {error && <ErrorMessage error={error.message} />}
            {/* {loader && <Loader/> } */}
            {movies && !error && 
                <ListMovies movies={movies}/>
                
            }
        </div>
    )
};

export default SearchMovie;

SearchMovie.propTypes = {
    images: PropTypes.array
}