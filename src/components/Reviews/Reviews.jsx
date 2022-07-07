import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ReviewInfo from 'components/ReviewInfo/ReviewInfo';
import { ReviewsNotFound } from 'components/MessageTitle/MessageTitle';
import s from './Reviews.module.css'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    const { id } = useParams(); // отримую параметр з url
    // console.log(id);

    useEffect(() => {
        
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=6498bc448a014b6e9c7e74504ab1fe83&language=en-US&page=1`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
            .then(details => {
                // console.log(details.results);
                setReviews(details.results) // записую відгуки в стейт
            })
            .catch(error => { setError(error) })
    }, [id]);
    
    return (
        <div>
            {reviews.length > 0 && !error ? 
                <ul>
                    {reviews.map((review) =>
                        <li key={review.id} className={s.item}>
                            <ReviewInfo review={review } />
                        </li>
                    )}
                </ul> 
                :
                <ReviewsNotFound/>
                // <h2 className={s.notInfo}>We don't have any reviews for this movie</h2>
            }
        </div>
    );
};

export default Reviews;