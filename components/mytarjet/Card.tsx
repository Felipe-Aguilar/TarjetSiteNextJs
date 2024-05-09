'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Props {
    image: string;
    token: string;
}

const Card = ({image, token} : Props) => {
    return ( 
        <motion.div 
            animate={{rotate: [0, -1.5, 1.5, 0]}}
            transition={{ease: "linear", delay: 2, duration: 0.3,repeat: Infinity, repeatDelay: 2}}
        >
            <Link href={`/st/${btoa(token)}`}>
                <Image 
                    src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${image}?timestamp=${Date.now()}`} 
                    alt="Tarjeta de presentación" 
                    width={820}
                    height={484}
                    priority={false}
                    unoptimized
                    style={{width: '100%', height: 'auto'}}
                />
                <span>Da click sobre la imagen para ver tu tarjeta digital</span>
            </Link>
        </motion.div>
    );
}

export default Card;