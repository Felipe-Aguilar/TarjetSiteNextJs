import Link from 'next/link';
import style from './page.module.scss';

const NotFound = () => {
    return ( 
        <div className={style.NotFound}>
            <img src="/images/404.svg" alt="404 - página no encontrada" />

            <h1>¡Lo sentimos! La página que buscas no existe</h1>
            <Link href={'/'}>
                Regresar al inicio
            </Link>
        </div>
    );
}

export default NotFound;