'use client';

import { motion } from "framer-motion";
import { BsFacebook, BsTelegram, BsWhatsapp, BsQrCodeScan } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";

import style from './social.module.scss';
import QrPop from "../qr/QrPop";

interface Props {
    token: string;
    close: () => void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 0.2}
}

const Social = ({token, close} :Props) => {
    const [showQr, setShowQr] = useState(false);
    const url = `https://tarjet.site/st/${btoa(token)}`;

    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <h5>Comparte el perfil Tarjet en las siguientes plataformas</h5>
                
                <div className={style.Social}>
                    <a onClick={() => setShowQr(true)} style={{cursor: 'pointer'}}>
                        <BsQrCodeScan className={style.Facebook}/>
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

            {showQr && <QrPop close={() => setShowQr(false)}/>}
        </div>
    );
}

export default Social;