import { UserDataResponse } from '@/interfaces/userData-interface';
import style from './services.module.scss';
import { BsCardImage, BsPlusLg } from 'react-icons/bs';

interface Props {
    userData: UserDataResponse;
}

const EditServices = ({ userData } : Props) => {
    return ( 
        <div className={style.Services}>
            <p>
                En tu Tarjet Site, se mostrarán los campos con la información que llenes, mientras que los campos vacíos permanecerán ocultos.
            </p>
            <h3>Listado de actividades</h3>
            <p>
                Sugerimos uses enunciados en forma de lista que describan tus actividades o principales servicios.
            </p>

            <div className={style.UploadImage}>
                <BsCardImage />
            </div>

            <button className={`btn ${style.UploadButton}`}>
                Subir imagen
            </button>

            <div className={style.FormServices}>
                <h4>Servicios</h4>
                <form>
                    <input type="text" placeholder='• Listado de servicio'/>
                    <input type="text" placeholder='• Listado de servicio'/>
                    <input type="text" placeholder='• Listado de servicio'/>
                    <input type="text" placeholder='• Listado de servicio'/>

                    <h4>Muestra de productos ó servicios</h4>

                    <button type='button'>
                        Bloque de servicio No. 1
                        <span><BsPlusLg /></span>
                    </button>
                    <button type='button'>
                        Bloque de servicio No. 2
                        <span><BsPlusLg /></span>
                    </button>
                    <button type='button'>
                        Bloque de servicio No. 3
                        <span><BsPlusLg /></span>
                    </button>
                    <button type='button'>
                        Bloque de servicio No. 4
                        <span><BsPlusLg /></span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditServices;