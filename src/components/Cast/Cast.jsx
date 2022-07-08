import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import ActorInfo from 'components/ActorInfo/ActorInfo';
import s from './Cast.module.css';
import { CastNotFound } from 'components/MessageTitle/MessageTitle';
import Loader from 'components/Loader/Loader';
import ButtonBack from 'components/ButtonBack/ButtonBack';

const Cast = () => {

    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const location = useLocation();

    const { id } = useParams(); // отримую параметр з url
    // console.log(id);

    useEffect(() => {
        setPrevPage(location.state?.from)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoader(true); // включаю лоадер

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6498bc448a014b6e9c7e74504ab1fe83&language=en-US`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
            .then(details => {
                // console.log(details.cast);
                setCast(details.cast) // записую акторський склад в стейт
                setLoader(false); // виключаю лоадер після загрузки
            })
            .catch(error => {
                setError(error);
                setLoader(false); // виключаю лоадер 
            })
    }, [id]);
    
    return (
        <div className={s.flex}>
            {loader && <Loader/> }
            {cast.length > 0 && cast && !error ? 
                <>
                    <ul className={s.list}>
                        {cast.map((actor) =>
                            <li key={actor.id} className={s.item}>
                                <ActorInfo actor={actor} />
                            </li>
                        )}
                    </ul>
                    <ButtonBack to={prevPage ?? "/movies"} classStyle={2} />
                </>
                :
                <CastNotFound/>
            }
        </div>
    );
};

export default Cast;