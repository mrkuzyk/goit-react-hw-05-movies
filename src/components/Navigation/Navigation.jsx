import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css'

export default function Navigation() {
    return (
        <nav className={s.nav}>
            <NavLink to='/' className={({isActive})=> isActive ? `${s.active} ${s.navLink}` : s.navLink}> Home </NavLink>
            <NavLink to='/movies' className={({isActive})=> isActive ? `${s.active} ${s.navLink}`  : s.navLink} >Movies</NavLink>
        </nav>
    );
};