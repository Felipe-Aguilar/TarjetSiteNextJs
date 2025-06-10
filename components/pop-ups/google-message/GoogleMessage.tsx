// components/pop-ups/google-message/GoogleMessage.tsx
import { motion } from "framer-motion";
import style from './google.module.scss';
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

interface Props {
    close: () => void;
    googleUrl: string;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 0.2}
}

const GoogleMessage = ({ close, googleUrl }: Props) => {
    // Verifica si googleUrl es una URL completa (que empiece con http:// o https://)
    const isFullUrl = googleUrl.startsWith('http://') || googleUrl.startsWith('https://');
    
    // Si no es una URL completa, asume que es solo un ID o texto plano
    const finalUrl = isFullUrl ? googleUrl : `https://www.google.com/search?q=${encodeURIComponent(googleUrl)}`;

    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <Image 
                    src={'/images/ilustracion-google.png'}
                    alt="Ilustración Google"
                    width={500}
                    height={500}
                    priority={false}
                    className={style.Image}
                />
                <h5>Opina en mis reseñas de Google</h5>

                <a 
                    href={finalUrl} // Usar la URL corregida
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`btn ${style.Link}`}
                >
                    Ver en Google <FcGoogle />
                </a>
                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default GoogleMessage;