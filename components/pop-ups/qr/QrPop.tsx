'use client';

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useCallback } from "react"; // Importa useRef y useCallback

interface Props {
    close: () => void;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 0.2}
}

const QrPop = ({close} : Props) => {
    const pathname = window.location.pathname;
    const qrCodeRef = useRef<HTMLDivElement>(null); // Crea una referencia para el contenedor del QR

    // Función para manejar la descarga del QR
    const handleDownloadQr = useCallback(() => {
        if (qrCodeRef.current) {
            const svgElement = qrCodeRef.current.querySelector('svg');
            if (svgElement) {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const svgUrl = URL.createObjectURL(svgBlob);

                const canvas = document.createElement('canvas');
                // Ajusta el tamaño del canvas si quieres un PNG de mayor resolución
                canvas.width = 300; 
                canvas.height = 300;
                const ctx = canvas.getContext('2d');

                const img = new Image();
                img.onload = () => {
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const pngUrl = canvas.toDataURL('image/png'); // Convierte a PNG

                    const downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = 'tarjet-qr.png'; // Nombre del archivo descargado
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(svgUrl); // Libera la URL del objeto
                };
                img.src = svgUrl;
            }
        }
    }, []);

    return ( 
        <div className="pop">
            <motion.div className={`container`} {...animate}>
                <h5>Comparte el perfil tarjet mediante un QR</h5>

                {/* Asigna la referencia al contenedor del QRCodeSVG */}
                <div ref={qrCodeRef} style={{display: 'block', margin: 'auto', width: '170px', height: '170px'}}>
                    <QRCodeSVG 
                        value={`https://tarjet.site/st${pathname.replace('/st', '')}`}
                        size={170}
                    />
                </div>

                <span 
                    style={{display: 'block', textAlign: 'center', marginTop: '20px', color: '#000'}}
                >
                    Escanea con tu smartphone
                </span>

                {/* Botón de descarga */}
                <button 
                    onClick={handleDownloadQr} 
                    style={{
                        display: 'block', 
                        margin: '10px auto', 
                        padding: '10px 20px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                    }}
                >
                    Descargar QR
                </button>

                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default QrPop;