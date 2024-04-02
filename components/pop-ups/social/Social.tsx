'use client';

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BsFacebook, BsTelegram, BsWhatsapp } from "react-icons/bs";

import style from './social.module.scss';

interface Props {
    close: () => void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}

const Social = ({close} :Props) => {

    const pathname = usePathname();

    const url = `https://tarjet.site/st${pathname}`;

    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <h5>Comparte tú perfil Tarjet en las siguientes plataformas</h5>
                
                <div className={style.Social}>
                    <a href={`https://www.facebook.com/sharer.php?u=${url}`} target="_blank">
                        <BsFacebook className={style.Facebook}/>
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${url}`} target="_blank">
                        <BsWhatsapp className={style.WhatsApp}/>
                    </a>
                    <a href={`https://telegram.me/share/url?url=${url}`} target="_blank">
                        <BsTelegram className={style.Telegram}/>
                    </a>
                </div>

                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default Social;