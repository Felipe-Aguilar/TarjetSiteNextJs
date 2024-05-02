import { motion } from "framer-motion";
import style from './whats.module.scss';
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";

interface Props {
    close: ()=>void;
    phone: string;
}

const animate = {
    initial: {scale: 0},
    animate: {scale: 1},
    transition: {delay: 1}
}

const WhatsAppMessage = ({ close, phone }: Props) => {
    return ( 
        <div className="pop">
            <motion.div className="container" {...animate}>
                <Image 
                    src={'/images/ilustracion-whats.webp'}
                    alt="Ilustración WhatsApp"
                    width={500}
                    height={500}
                    priority={false}
                    className={style.Image}
                />
                <h5>Mándame un WhatsApp ahora</h5>

                <a href={`https://wa.me/${phone}`} target="_blank" className={`btn ${style.Link}`}>
                    Enviar mensaje <BsWhatsapp />
                </a>
                <button className="close" onClick={close}>
                    cerrar ventana (x)
                </button>
            </motion.div>
        </div>
    );
}

export default WhatsAppMessage;