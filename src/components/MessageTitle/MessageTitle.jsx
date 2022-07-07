import s from './MessageTitle.module.css'

export const StartSearch = () => {
    return (
        <h1 className={s.title}>Please start search</h1>
    );
};

export const MovieNotFound = ({ name }) => {
    return (
        <h1 className={s.title}>Не знайдено фільмів з ім'ям <span className={s.name}>{name}</span></h1>
    );
};

export const PageNotFound = () => {
    return (
        <h1 className={s.notFound}>404 Сторінку не знайдено</h1>
    );
};

export const ErrorMessage = ({error}) => {
    return (
        <h1 className={s.error}>{error}</h1>
    )
}

export const ReviewsNotFound = () => {
    return (
        <h1 className={s.titleDetail}>We don't have any reviews for this movie</h1>
    );
}; 

export const CastNotFound = () => {
    return (
        <h1 className={s.titleDetail}>We do not have any information about cast</h1>
    );
}; 