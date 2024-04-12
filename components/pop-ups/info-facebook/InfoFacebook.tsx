import { motion } from "framer-motion";
import Image from "next/image";

import style from './facebook.module.scss';

interface Props {
    close: ()=>void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}

const InfoFacebook = ({close} :Props) => {
    return ( 
        <div className="pop">
            <motion.div className={`container ${style.Info}`} {...animate}>
                <h5>Para compartir tu perfil de facebook</h5>

                <Image 
                    src={'/images/compartir-facebook.jpeg'}
                    alt="Imagen como compartir perfil de facebook"
                    width={800}
                    height={800}
                />
                <p>Dirígete a la configuración de tu perfil y copia el enlace a tu perfil</p>

                <button className="close" onClick={close} type="button">
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default InfoFacebook;