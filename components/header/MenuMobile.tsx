// 'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFacebook, BsInstagram, BsX } from 'react-icons/bs';

import style from './header.module.scss';
import NavLinks from './NavLinks';


const animation = {
    initial: { scale: 0 },
    animate: { scale: 1},
    exit: {height: 0}
}

const socialLinks = [
    {
        path: 'https://www.facebook.com/profile.php?id=100095193982785&mibextid=ZbWKwL', 
        icon: <BsFacebook />
    },
    {
        path: 'https://www.instagram.com/tarjetmx/', 
        icon: <BsInstagram />
    },
]

const MenuMobile = (  ) => {

    const [open, setOpen] = useState<boolean>(false);

    useEffect(()=>{
        if (open) {
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    },[open]);

    return ( 
        <>
            <button onClick={()=>setOpen(!open)}>
                {!open ? 'Menú' : <BsX />}
            </button>

            <AnimatePresence>
                { open && (
                    <motion.div {...animation} className={style.Container}>
                        <nav>
                            <NavLinks close={()=>setOpen(false)}/>
                        </nav>

                        <hr/>

                        <div className={style.Social}>
                            { socialLinks.map((social)=>(
                                <a href={social.path} key={social.path}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default MenuMobile;