import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovie } from "api/fetchApi";
import SearchBar from "components/SearchBar/SearchBar";
import ListMovies from "movies/ListMovies/ListMovies";
import { StartSearch, MovieNotFound, ErrorMessage } from 'components/MessageTitle/MessageTitle';
import Loader from "components/Loader/Loader";

const SearchMovie = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [totalMovies, setTotalMovies] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    useEffect(() => {
        //щоб не рендилося одразу при завантажені , роблю перевірку на те чи є запит
        if (!query) {
            return
        }

        setLoader(true); // включаю лоадер
        
        fetchSearchMovie(query)
            .then(movies => {
                setMovies(movies.results);
                setTotalMovies(movies.total_results)
            })
            .catch(error =>{
                setError(error);
            })
            .finally(() => {
                setLoader(false); // виключаю лоадер
            })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query]);

    return (
        <div className="container">
            <SearchBar/>
            {!query && <StartSearch/>}
            {totalMovies === 0 && 
                <MovieNotFound
                    name={query}
                />
            }
            {error && <ErrorMessage error={error.message} />}
            {loader && <Loader/> }
            {movies && !error && 
                <ListMovies movies={movies}/>
            }
        </div>
    )
};

export default SearchMovie;