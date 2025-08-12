import { motion } from "framer-motion";
import { UserDataResponse } from "@/interfaces/userData-interface";

import defaultStyle from './site.module.scss';
import winterStyle from '../themes/winter.module.scss'
import darkStyle from '../themes/dark.module.scss';

import Image from "next/image";

interface Props {
    userData: UserDataResponse;
    tema: string;
}

const animateCard = {
    animate: {rotate: [0, -1.5, 1.5, 0]},
    transition: {ease: "linear", delay: 2, duration: 0.3,repeat: Infinity, repeatDelay: 2}
}

const HeadSite = ({userData, tema} : Props) => {

    // Determinar qué tema usar
    const getThemeStyle = () => {
        switch(tema) {
            case 'invierno':
                return winterStyle;
            case 'oscuro':
                return darkStyle;
            default:
                return defaultStyle;
        }
    };
    const style = getThemeStyle();
    
    return ( 
        <div className={style.Head}>
            <motion.div {...animateCard}>
                <Image 
                    src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${userData.ImgTarFrente}?timestamp=${Date.now()}`}
                    alt='Tarjeta de presentación'
                    width={820}
                    height={515}
                    quality={80}
                    className={style.Card}
                    unoptimized
                />
            </motion.div>

            <Image 
                src={`${userData.ImgFoto 
                    ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${userData.ImgFoto}?timestamp=${Date.now()}` 
                    : '/images/perfil-temporal.webp'
                }`}
                alt='Imagen de perfil'
                width={500}
                height={500}
                quality={80}
                className={`${style.Perfil} ${userData.Premium ? style.PremiumPerfil : ''}`} // Clase condicional
                unoptimized
            />
        </div>
    );
}

export default HeadSite;