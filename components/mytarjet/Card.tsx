'use client';

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
    image: string;
    token: string;
}

const Card = ({image, token} : Props) => {
    return ( 
        <Link href={`/st/${btoa(token)}`}>
            <motion.img 
                src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/${image}`} 
                alt="Tarjeta de presentación" 
                animate={{rotate: [0, -1.5, 1.5, 0]}}
                transition={{ease: "linear", delay: 2, duration: 0.3,repeat: Infinity, repeatDelay: 2}}
            />
            <span>Da click sobre la imagen para ver tu tarjeta digital</span>
        </Link>
    );
}

export default Card;