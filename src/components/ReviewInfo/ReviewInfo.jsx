import s from './ReviewInfo.module.css';

const ReviewInfo = ({ review: {id, author, content } }) => {
    return (
        <>
            <h3 className={s.title}>{author}</h3>
            <p className={s.titleText}>{content}</p>
        </>
    );
};

export default ReviewInfo;