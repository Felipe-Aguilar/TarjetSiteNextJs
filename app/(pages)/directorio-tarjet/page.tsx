import style from './directory.module.scss';
import TopUsers from '@/components/directory/topUsers';
import Search from '@/components/directory/Search';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
    title: 'Directorio - Tarjet',
    description: 'Directorio tarjet, encuentra personas cerca de tí',
};

const Directoy = async () => {

    const responseCategories = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaCategorias?Nivel1=&Nivel2=', {
        method: 'GET',
        mode: 'cors',
    });
    const dataCategories = await responseCategories.json();


    const responseTop = await fetch('https://souvenir-site.com/WebTarjet/APIDirectorio/ObtenerTopTarjets',{
        method: 'GET',
        mode: 'cors',
    });
    const dataTop = await responseTop.json();

    return ( 
        <div className={`body ${style.Directory}`}>
            <Search categories={dataCategories}/>
            <TopUsers data={dataTop}/>
        </div>
    );
}

export default Directoy;