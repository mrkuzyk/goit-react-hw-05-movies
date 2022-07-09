import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchOneMovieDetails } from 'api/fetchApi';
import Loader from 'components/Loader/Loader';
import ButtonBack from 'components/ButtonBack/ButtonBack';
import s from './OneMovieDetails.module.css';

const OneMovieDetails = () => {
    const [movie, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [loader, setLoader] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [movieName, setMovieName] = useState('React App');
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        const titlePage = document.getElementById('title');
        titlePage.textContent = movieName;

        return () => {
            titlePage.textContent = 'React App';
        }
    },[movieName])

    useEffect(() => {
        setPrevPage(location.state?.from)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoader(true); // включаю лоадер

        fetchOneMovieDetails(id)
            .then(movie => {
                // console.log(movie);
                setMovies(movie)
                setFirstLoad(false)
                setMovieName(movie.title)
            })
            .catch(error => {
                setError(error) 
            })
            .finally(() => {
                setLoader(false); // виключаю лоадер
            })
        
    }, [id]);

    const templatePhoto = 'https://raw.githubusercontent.com/h0wter/JS-Project/main/src/images/default_img/filmoteka.jpg';
    const { poster_path, title, original_title, release_date, vote_average, overview, genres } = movie;
    
    return (
        <section className={s.movieDetails}>
            <div className="container">
                <ButtonBack to={prevPage ?? "/movies"} classStyle={1} />
                {loader && <Loader />}
                {movie && !error && !firstLoad &&
                    <>
                        <div className={s.flex}>
                            <img
                            src={ poster_path
                                ? `https://image.tmdb.org/t/p/w400${poster_path}`
                                : templatePhoto
                            }
                                alt={title}
                                className={s.img}
                            />
                            <div>
                                <h2 className={s.name}>{original_title} ({Number.parseInt(release_date)})</h2>
                                <p className={s.score}>User Score: {vote_average * 10}%</p>
                                <h3 className={s.title}>Overview</h3>
                                <p className={s.titleText}>{overview}</p>
                                {genres && genres.length > 1 && <h3 className={s.title}>Genres</h3>}
                                {genres && <p className={s.titleText}>{genres.map((g) => g.name).join(' | ')}</p>}
                            </div>
                        </div>
                    
                        <h3 className={s.additionalInformation}>Additional information</h3>
                        <div className={s.infoBtn}>
                            <NavLink
                                to='cast'
                                state={{ from: prevPage }}
                                replace={true}
                                className={({ isActive }) => isActive ? `${s.active} ${s.info}` : s.info}
                            >
                                Cast
                            </NavLink>
                            <NavLink
                                to='reviews'
                                state={{ from: prevPage }}
                                replace={true}
                                className={({ isActive }) => isActive ? `${s.active} ${s.info}` : s.info}
                            >
                                Reviews
                            </NavLink>
                        </div>
                        <Outlet />
                    </>
                }
            </div>
        </section>
    );
};

export default OneMovieDetails;