'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

import Image from "next/image";
import style from './profile.module.scss';
import { BsBag, BsJournalArrowDown } from "react-icons/bs";

const animate = {
    initial :{ opacity:0 , y: -20 },
    whileInView:{ y:0, opacity: 1 },
    viewport: { once:true }
}

const ButtonsSiteMxm = () => {

    const [shareProfile, setShareProfile] = useState<boolean>(false);

    return ( 
        <div className={style.Buttons}>
            <motion.button {...animate} transition={{delay: 1}} className={style.Share} onClick={()=>setShareProfile(true)}>
                Comparte mi tarjeta
                <span>
                    <Image 
                        src={'/images/icono-compartir.svg'}
                        alt='icono de redes sociales'
                        width={150}
                        height={150}
                    />
                </span>
            </motion.button>

            <motion.div {...animate} transition={{delay: 1.2}} style={{width: '95%'}}>
                <Link
                    to="SocialSection"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={style.Social}
                    style={{width: '100%', cursor: 'pointer'}}
                >
                    Mis redes sociales
    
                    <span>
                        <Image 
                            src={'/images/icono-redes.svg'}
                            alt='icono de redes sociales'
                            width={150}
                            height={150}
                        />
                    </span>
                </Link>
            </motion.div>

            <motion.div {...animate} transition={{delay: 1.4}} style={{width: '95%'}}>
                <Link
                    to="SellersSection"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={style.Seller}
                    style={{width: '100%', cursor: 'pointer'}}
                >
                    Elige a tu vendedor
    
                    <span>
                        <BsBag />
                    </span>
                </Link>
            </motion.div>

            <motion.button {...animate} transition={{delay: 1.6}} className={style.Catalog} onClick={()=>setShareProfile(true)}>
                Descargar catálogo

                <span>
                    <BsJournalArrowDown />
                </span>
            </motion.button>
        </div>
    );
}

export default ButtonsSiteMxm;