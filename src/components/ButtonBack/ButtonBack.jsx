import { NavLink } from 'react-router-dom';
import s from './ButtonBack.module.css';
import PropTypes from 'prop-types';
// s.btnBottom
const ButtonBack = ({ to, classStyle }) => {
    return (
        <div className={s.div}>
            <NavLink to={to} className={classStyle === 1 ? s.btnTop : s.btnBottom}> <span className={s.span}> &lt; </span> Go back</NavLink>
        </div>
    );
};

export default ButtonBack;

ButtonBack.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.string.isRequired
    ]),
    classStyle: PropTypes.number.isRequired
};