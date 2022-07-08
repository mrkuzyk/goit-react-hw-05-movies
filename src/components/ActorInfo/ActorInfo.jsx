import s from './ActorInfo.module.css';
import PropTypes from 'prop-types';

const ActorInfo = ({ actor: { id, profile_path, name, character } }) => {
    return (
        <>
            <img
                src={profile_path ? `https://image.tmdb.org/t/p/w400${profile_path}` : 'https://media.istockphoto.com/vectors/female-profile-picture-generic-woman-website-avatar-vector-id1390051292?b=1&k=20&m=1390051292&s=170667a&w=0&h=i364yGifpV5uGxu1ukyPFSa5ZwwapCK95OH7I2376Hk='}
                alt={name}
                className={s.img}
            />
            <h3 className={s.title}>{name}</h3>
            <p className={s.titleText}>Character: {character}</p>
        </>
    );
};

export default ActorInfo;

ActorInfo.propTypes = {
    actor: PropTypes.object.isRequired
};