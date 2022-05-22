import { BallTriangle } from 'react-loader-spinner';
import style from './loader.module.css';

export const Loader = () => { 
    return <div className={ style.loader}>
            <BallTriangle color="#00BFFF" height={80} width={80} />
        </div>
}