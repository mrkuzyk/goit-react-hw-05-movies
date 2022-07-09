import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import ReviewInfo from 'movies/ReviewInfo/ReviewInfo';
import { ReviewsNotFound } from 'components/MessageTitle/MessageTitle';
import s from './Reviews.module.css';
import Loader from 'components/Loader/Loader';
import ButtonBack from 'components/ButtonBack/ButtonBack';
import { fetchReviews } from 'api/fetchApi';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
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

        fetchReviews(id)
            .then(details => {
                // console.log(details.results);
                setReviews(details.results) // записую відгуки в стейт
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoader(false); // виключаю лоадер
            })
    }, [id]);
    
    return (
        <div>
            {loader && <Loader/> }
            {reviews.length > 0 && !error ? 
                <>
                    <ul className={s.ul}>
                        {reviews.map((review) =>
                            <li key={review.id} className={s.item}>
                                <ReviewInfo review={review } />
                            </li>
                        )}
                    </ul>
                    <ButtonBack to={prevPage ?? "/movies"} classStyle={2} />
                </>    
                :
                <ReviewsNotFound/>
                // <h2 className={s.notInfo}>We don't have any reviews for this movie</h2>
            }
        </div>
    );
};

export default Reviews;