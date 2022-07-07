import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.loader}>
            <ThreeDots color="rgba(4, 57, 92, 0.903)" height={80} width={80} />
        </div>
    );
};

export default Loader;