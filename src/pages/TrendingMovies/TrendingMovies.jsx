import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "api/fetchApi";
import ListMovies from "movies/ListMovies/ListMovies";
import Loader from "components/Loader/Loader";
import s from './TrendingMovies.module.css';

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [loader, setLoader] = useState(false);
        
    useEffect(() => {

        if (firstLoad) {
            return setFirstLoad(false);
        }

        setLoader(true); // включаю лоадер

        fetchTrendingMovies()
            .then(movies => {
                // console.log(movies);
                setMovies(movies.results)
                // setLoader(false); // виключаю лоадер після загрузки
            })
            .catch(error => {
                setError(error)
                // setLoader(false); // виключаю лоадер
            })
            .finally(() => {
                setLoader(false); // виключаю лоадер
            })
    }, [firstLoad]);
        
    return (
        <section>
            {loader && <Loader/> }
            {movies && !error &&
                <div className="container">
                    <h3 className={s.title}>Trending today</h3>
                    <ListMovies
                        movies={movies}
                    />
                </div>
            }
        </section>
    );
};

export default TrendingMovies;