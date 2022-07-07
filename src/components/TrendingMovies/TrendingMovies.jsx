import ListMovies from "components/ListMovies/ListMovies";
import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
import s from './TrendingMovies.module.css';

export default function TrendingMovies() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
        
    useEffect(() => {

        if (firstLoad) {
            return setFirstLoad(false);
        }

        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=6498bc448a014b6e9c7e74504ab1fe83')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
            .then(movies => {
                // console.log(movies.results);
                setMovies(movies.results)
            })
            .catch(error => { setError(error) })
    }, [firstLoad]);
        
    return (
        <section>
            {movies && !error &&
                <div className="container">
                    <h3 className={s.title}>Trending today</h3>
                    <ListMovies movies={movies}/>
                </div>
            }
        </section>
    );
};