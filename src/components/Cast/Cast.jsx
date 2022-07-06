import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ActorInfo from 'components/ActorInfo/ActorInfo';

const Cast = () => {

    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);

    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6498bc448a014b6e9c7e74504ab1fe83&language=en-US`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                };

                return response.json();
            })
            .then(details => {
                // console.log(details.cast);
                setCast(details.cast)
            })
            .catch(error => { setError(error) })
    }, [id]);
    return (
        <div>
            {cast && !error && 
                <ul>
                    {cast.map((actor) =>
                        <li key={actor.id}>
                            <ActorInfo actor={actor} />
                        </li>
                    )}
                </ul>
            }
        </div>
    );
};

export default Cast;