import fetchTemplate from "./fetchTemplate";

const API_KEY = '6498bc448a014b6e9c7e74504ab1fe83';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = () => {
    const trendingMoviesUrl = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
    return fetchTemplate(trendingMoviesUrl)
};

export const fetchSearchMovie = (query) => {
    return (
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                return Promise.reject(
                    new Error(`Не знайдено фільмів з ім'ям ${query}. Перезавантажте сторінку і спробуйте ще раз!`)
                );
            })
    );
};

export const fetchOneMovieDetails = (id) => {
    const movieDetailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
    return fetchTemplate(movieDetailsUrl);
};

export const fetchCast = (id) => {
    const castUrl = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    return fetchTemplate(castUrl);
};

export const fetchReviews = (id) => {
    const reviewsUrl = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
    return fetchTemplate(reviewsUrl);
};