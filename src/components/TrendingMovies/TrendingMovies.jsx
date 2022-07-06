import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

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
                setMovies(movies.results)
            })
            .catch(error => { setError(error) })
    }, []);
        
    return (
        <>
            { movies && !error &&
                <ul >
                    {movies.map(({ id, title }) => 
                        <li>
                            <Link
                                style={{ display: 'flex' }}
                                to={`/movies/${id}`}
                                key={id}
                            >
                                {title}
                            </Link>
                    </li>)}
                </ul>
            }
        </>
    );
};