import TopUsers from '@/components/directory/topUsers';
import style from './directory.module.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
    title: 'Directorio - Tarjet',
    description: 'Directorio tarjet, encuentra personas cerca de tí',
};

const Directoy = async () => {

    const response = await fetch('https://souvenir-site.com/WebTarjet/APIDirectorio/ObtenerTopTarjets',{
        method: 'GET',
        mode: 'cors',
    });

    const data = await response.json();

    return ( 
        <div className={`body ${style.Directory}`}>
            <TopUsers data={data}/>
        </div>
    );
}

export default Directoy;