import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './ListMovies.module.css';

const ListMovies = ({ movies }) => {
    const location = useLocation();

    return (
        <ul className={s.list}>
            {movies.map(({ id, title, poster_path }) =>
                <li key={id} className={s.item}>
                    <Link
                        to={`/movies/${id}`}
                        className={s.movie}
                        state={{ from: location }}
                    >
                        <img
                            src={poster_path ? `https://image.tmdb.org/t/p/w400${poster_path}` : 'https://raw.githubusercontent.com/h0wter/JS-Project/main/src/images/default_img/filmoteka.jpg'}
                            alt={title}
                            className={s.img}
                        />
                        {title}
                    </Link>
                </li>)}
        </ul>
    );
};

export default ListMovies;

ListMovies.propTypes = {
    movies: PropTypes.array.isRequired
}