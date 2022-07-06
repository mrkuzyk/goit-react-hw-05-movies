import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import s from './TrendingMovies.module.css';

export default function TrendingMovies() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
        
    useEffect(() => {
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
    }, []);
        
    return (
        <section>
            {movies && !error &&
                <div className="container">
                    <h3 className={s.title}>Trending today</h3>
                    <ul className={s.list}>
                        {movies.map(({ id, title, poster_path }) => 
                            <li key={id} className={ s.item}>
                                <Link to={`/movies/${id}`}  className={s.movie}>
                                    <img
                                        src={poster_path && `https://image.tmdb.org/t/p/w400${poster_path}`}
                                        alt={title}
                                        className={s.img}
                                    />
                                    {title}
                                </Link>
                            </li>)}
                    </ul>
                </div>
            }
        </section>
    );
};