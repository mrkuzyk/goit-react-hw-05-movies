import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
            <ul>
                <Link to='/' > Home </Link>
                <Link to='/movies'>Movies</Link>
            </ul>
        </nav>
    );
};