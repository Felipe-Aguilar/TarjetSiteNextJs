import { motion } from "framer-motion";
import style from './other.module.scss';
import Image from "next/image";

interface Props {
    close: ()=>void;
    url: string;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 0.2}
}

const OtherMessage = ({ close, url }: Props) => {
    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <Image 
                    src={'/images/ilustracion-link.webp'}
                    alt="Ilustración enlace externo"
                    width={500}
                    height={500}
                    priority={false}
                    className={style.Image}
                />
                <h5>Visita mi sitio web</h5>

                <a 
                    href={url.startsWith('http') ? url : `https://${url}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`btn ${style.Link}`}
                >
                    Continuar
                </a>
                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default OtherMessage;