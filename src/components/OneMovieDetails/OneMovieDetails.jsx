import { useParams, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import s from './OneMovieDetails.module.css';
import Loader from '../Loader/Loader';

const OneMovieDetails = () => {
    const [movie, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [loader, setLoader] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setLoader(true); // включаю лоадер

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6498bc448a014b6e9c7e74504ab1fe83&language=en-US`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
            .then(movie => {
                // console.log(movie);
                setMovies(movie)
                setFirstLoad(false)
                setLoader(false); // виключаю лоадер після загрузки
            })
            .catch(error => {
                setError(error)
                setLoader(false); // виключаю лоадер 
            })
    }, [id]);


    const { poster_path, title, original_title, release_date, vote_average, overview, genres } = movie;
    return (
        <section className={s.movieDetails}>
            {loader && <Loader/> }
            {movie && !error && !firstLoad && 
                <div className="container">
                    <div className={s.flex}>
                        <img
                            src={poster_path && `https://image.tmdb.org/t/p/w400${poster_path}`}
                            alt={title}
                            className={s.img}
                        />
                        <div>
                            <h2 className={s.name}>{original_title} ({Number.parseInt(release_date)})</h2>
                            <p className={s.score}>User Score: {vote_average * 10}%</p>
                            <h3 className={s.title}>Overview</h3>
                            <p className={s.titleText}>{overview}</p>
                            <h3 className={s.title}>Genres</h3>
                            {genres && <p className={s.titleText}>{genres.map((g) => g.name).join(' | ')}</p>}
                        </div>
                    </div>
                    
                    <h3 className={s.additionalInformation}>Additional information</h3>
                    <div className={s.infoBtn}>
                        <NavLink
                            to='cast'
                            replace={true}
                            className={({isActive})=> isActive ? `${s.active} ${s.info}` : s.info}
                        >
                            Cast
                        </NavLink>
                        <NavLink
                            to='reviews'
                            replace={true}
                            className={({isActive})=> isActive ? `${s.active} ${s.info}` : s.info}
                        >
                            Reviews
                        </NavLink>
                    </div>
                    <Outlet/>
                </div>
            }
        </section>
    )
}

export default OneMovieDetails;