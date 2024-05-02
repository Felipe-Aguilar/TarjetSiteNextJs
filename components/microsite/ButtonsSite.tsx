import { UserDataResponse } from '@/interfaces/userData-interface';
import { motion } from 'framer-motion';

import { Fragment } from 'react';
import { BsWhatsapp } from 'react-icons/bs';

import style from './site.module.scss';
import Image from 'next/image';
import FileSaver from 'file-saver';

interface Props {
    userData: UserDataResponse;
}

const animate = {
    initial :{ opacity:0 , y: -20 },
    whileInView:{ y:0, opacity: 1 },
    viewport: { once:true }
}

const ButtonsSite = ({userData} :Props) => {

    
    // *Guardar contacto
    const SaveContact = async () => {

        const nameUser = `${userData.Nom} ${userData.AppP} ${userData.AppM}`;

        const content = `BEGIN:VCARD
VERSION:3.0
N:${nameUser};;;
FN:${nameUser}
TITLE:${nameUser};
EMAIL;type=INTERNET;type=pref:${userData.Mail}
TEL;type=MAIN:${userData.Activid}
TEL;type=CELL;type=VOICE;type=pref:${userData.Telefono1}
ADR;type=WORK;type=pref:;;;${userData.Colonia};;;
END:VCARD`;

        const blob = new Blob([content], { type: "text/vcard;charset=utf-8" });
        FileSaver.saveAs(blob, `${nameUser}.vcf`, true);
    }

    return ( 

        <div className={style.Buttons}>
            { userData && (
                <Fragment>
                    <motion.button {...animate} {...animate} transition={{delay: 1}} onClick={()=>SaveContact()}>
                        Guardar en mis contactos
        
                        <span>
                            <Image 
                                src={'/images/icono-contacto.svg'}
                                alt='icono de contacto'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.button>
        
                    { userData.Telefono1 && (
                        <motion.a href={''} {...animate} transition={{delay: 1.2}} className={style.WhatsApp}>
                            Envíame un WhatsApp
        
                            <span>
                                <BsWhatsapp />
                            </span>
                        </motion.a>
                    ) }

                    { userData.Telefono2 && (
                        <motion.a href={''} {...animate} transition={{delay: 1.4}} className={style.WhatsApp}>
                            Envíame un WhatsApp
        
                            <span>
                                <BsWhatsapp />
                            </span>
                        </motion.a>
                    ) }

                    { userData.VerUbicacion === 1 && (
                        <motion.a href={''} {...animate} transition={{delay: 1.4}} className={style.Ubication}>
                            {userData.TexoUbica && `${userData.TexoUbica} `}
                            {userData.Colonia}

                            <span>
                                <Image 
                                    src={'/images/icono-ubicacion.svg'}
                                    alt='icono de ubicación'
                                    width={150}
                                    height={150}
                                />
                            </span>
                        </motion.a>
                    ) }
                    
                    { userData.Mail && (
                        <motion.a href={''} {...animate} transition={{delay: 1.6}} className={style.Email}>
                            {userData.Mail}

                            <span>
                                <Image 
                                    src={'/images/icono-correo.svg'}
                                    alt='icono de ubicación'
                                    width={150}
                                    height={150}
                                />
                            </span>
                        </motion.a>
                    ) }

                    { userData.Web && (
                        <motion.a href={''} {...animate} transition={{delay: 1.8}} className={style.Web}>
                            {userData.Web}

                            <span>
                                <Image 
                                    src={'/images/icono-sitio-web.svg'}
                                    alt='icono de ubicación'
                                    width={150}
                                    height={150}
                                />
                            </span>
                        </motion.a>
                    ) }

                    <motion.button {...animate} transition={{delay: 2}} className={style.Social}>
                        Mis redes sociales
        
                        <span>
                            <Image 
                                src={'/images/icono-redes.svg'}
                                alt='icono de redes sociales'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.button>

                    <motion.button {...animate} transition={{delay: 2.2}} className={style.Share}>
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

                    <motion.button {...animate} transition={{delay: 2.4}} className={style.Save}>
                        Guarda en mi tarjetero tarjet
        
                        <span>
                            <Image 
                                src={'/images/icono-t-tarjet.svg'}
                                alt='icono de redes sociales'
                                width={150}
                                height={150}
                            />
                        </span>
                    </motion.button>
                </Fragment>
            )}
        </div>
    );
}

export default ButtonsSite;