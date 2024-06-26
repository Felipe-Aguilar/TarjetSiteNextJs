'use client';

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

interface Props {
    close: () => void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}

const QrPop = ({close} : Props) => {

    const pathname = usePathname();

    return ( 
        <div className="pop">
            <motion.div className={`container`} {...animate}>
                <h5>Comparte tu perfil tarjet mediante un Qr</h5>

                <QRCodeSVG 
                    value={`https://tarjet.site/st${pathname}`}
                    style={{display: 'block', margin: 'auto'}}
                    size={170}
                />

                <span 
                    style={{display: 'block', textAlign: 'center', marginTop: '20px', color: '#000'}}
                >
                    Escanea con tu smartphone
                </span>

                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default QrPop;