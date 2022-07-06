const ActorInfo = ({ actor: {id, profile_path, name, character } }) => {
    return (
        <>
            <img
                src={profile_path && `https://image.tmdb.org/t/p/w400${profile_path}`}
                alt={name}
                height='250px'
            />
            <h3>{name}</h3>
            <p>Character: {character}</p>
        </>
    );
};

export default ActorInfo;