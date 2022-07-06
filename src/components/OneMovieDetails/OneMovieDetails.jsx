import { useParams, Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";

const OneMovieDetails = () => {
    const [movie, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6498bc448a014b6e9c7e74504ab1fe83&language=en-US`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
            .then(movie => {
                console.log(movie);
                setMovies(movie)
            })
            .catch(error => { setError(error) })
    }, [id]);


    const { poster_path, title, original_title, release_date, vote_average, overview, genres } = movie;
    return (
        <>
            {movie && !error && 
                <>
                    <img
                        src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                        alt={title}
                        height='400px'
                    />
                <h2>{original_title} ({Number.parseInt(release_date)})</h2>
                <p>User Score: {vote_average * 10}%</p>
                <h3>Overview</h3>
                <p>{overview}</p>
                <h3>Genres</h3>
                {genres && <p>{genres.map((g) => g.name).join(' ')}</p>}

                <h3>Additional information</h3>
                <Link to='cast'>Cast</Link>
                <Link to='reviews'>Reviews</Link>
                <Outlet/>
                </>
            }
        </>
    )
}

export default OneMovieDetails;