import Image from 'next/image';
import style from './data.module.scss';
import { UserDataResponse } from '@/interfaces/userData-interface';

interface Props {
    userData: UserDataResponse;
}

const Data = ( {userData}:Props ) => {
    return ( 
        <div className={style.Data}>
            <p>Esta información se mostrará en el directorio</p>

            <div className={style.SubmitImage}>
                <Image 
                    src={`https://tarjet.site/imagenes/perfil-imagenes/${userData.ImgFoto}`}
                    alt='Imagen de perfil'
                    width={500}
                    height={500}
                />

                <button className='btn'>
                    Imagen ó Logotipo
                    <span>cargar ó cambiar imagen</span>
                </button>
            </div>
        </div>
    );
}

export default Data;