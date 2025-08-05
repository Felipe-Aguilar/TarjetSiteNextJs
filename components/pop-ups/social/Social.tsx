'use client';

import { motion } from "framer-motion";
import { BsTelegram, BsWhatsapp, BsQrCodeScan, BsLink45Deg } from "react-icons/bs";
import { useState } from "react";

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
    const [copied, setCopied] = useState(false);
    const url = `https://tarjet.site/st/${btoa(token)}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar: ', err);
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleQrClick = () => {
        setShowQr(true);
        copyToClipboard(); // Copia el enlace al abrir el QR
    };

    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <h5>Comparte el perfil Tarjet</h5>
                
                <div className={style.Social}>
                    <a onClick={handleQrClick} style={{cursor: 'pointer'}} title="Generar QR y copiar enlace">
                        <BsQrCodeScan className={style.QrIcon}/>
                        <span className={style.tooltip}>Copiar y QR</span>
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${url}`} target="_blank" title="Compartir en WhatsApp">
                        <BsWhatsapp className={style.WhatsApp}/>
                        <span className={style.tooltip}>WhatsApp</span>
                    </a>
                    <a href={`https://telegram.me/share/url?url=${url}`} target="_blank" title="Compartir en Telegram">
                        <BsTelegram className={style.Telegram}/>
                        <span className={style.tooltip}>Telegram</span>
                    </a>
                </div>

                {copied && <div className={style.copyNotification}>¡Enlace copiado!</div>}

                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>

            {showQr && <QrPop close={() => setShowQr(false)}/>}
        </div>
    );
}

export default Social;