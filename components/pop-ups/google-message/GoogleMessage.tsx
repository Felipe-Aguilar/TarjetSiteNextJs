// components/pop-ups/google-message/GoogleMessage.tsx
import { motion } from "framer-motion";
import style from './google.module.scss';
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

interface Props {
    close: () => void;
    googleUrl: string; // Nueva prop para la URL de Google
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 0.2}
}

const GoogleMessage = ({ close, googleUrl }: Props) => {
    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <Image 
                    src={'/images/ilustracion-google.webp'}
                    alt="Ilustración Google"
                    width={500}
                    height={500}
                    priority={false}
                    className={style.Image}
                />
                <h5>Visita mi perfil de Google</h5>

                <a 
                    href={googleUrl || 'https://maps.google.com'} // Usar la URL de la API o un fallback
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