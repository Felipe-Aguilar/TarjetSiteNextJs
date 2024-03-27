'use client';

import style from './aviso.module.scss';
import { BsChevronDown } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Aviso = () => {

    const [open, setOpen] = useState<boolean>();
    const [open2, setOpen2] = useState<boolean>();
    const [open3, setOpen3] = useState<boolean>();
    const [open4, setOpen4] = useState<boolean>();

    const acordeonVariantes = {
        open: { height: 500 },
        closed: { height: 0 },
    };

    return ( 
        <div className="body">
            <div className={`container ${style.Aviso}`}>
                <h1>Aviso de privacidad</h1>

                <div className={style.container}>
                    <button onClick={()=>setOpen(!open)}>
                        1. ¿Qué es Tarjet?

                        <motion.div animate={open ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={acordeonVariantes}
                            >
                                <p>
                                    Tarjet, “Tu tarjeta de presentación virtual”, con domicilio en Avenida Industria Militar No. 1055, Colonia Lomas de Sotelo, Miguel Hidalgo Ciudad de México, C.P. 11200, está comprometido con la protección de sus datos personales, al ser responsable de su uso, manejo y confidencialidad mediante la continua revisión de nuestros procesos de protección de datos de manera física como electrónica. 
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                    <button onClick={()=>setOpen2(!open2)}>
                        2. Datos personales

                        <motion.div animate={open2 ? {rotate: 180} : {rotate: 0}}>
                            <BsChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        { open2 && (
                            <motion.div 
                                className={style.Text} 
                                initial="closed"
                                animate="open"
                                transition={{duration: 0.6}}
                                exit= "closed"
                                variants={acordeonVariantes}
                            >
                                <p>
                                    <b>¿Para que fines recabamos y utilizamos sus datos personales?</b>
                                </p>
                                <ul>
                                    <li>Los datos personales que le son recabados serán utilizados para Generar su tarjeta de presentación virtual y mostrarlos a las personas que consulten su información, misma información será ingresada por usted, mediante nuestros formularios.</li>
                                    <li>Sus datos personales serán utilizados para las finalidades necesarias para el servicio y/o producto que solicitó.</li>
                                </ul>
                                <p>
                                    De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio y/o producto solicitado y/o contratado, pero que nos permite brindarle una mejor atención: 
                                </p>
                                <ul>
                                    <li> Informarle de nuevos productos y actualizaciones de Tarjet.</li>
                                    <li>Evaluar la calidad de servicio.</li>
                                </ul>
                                <p>
                                    En caso de que no desee que sus datos personales sean tratados para estos fines adicionales, desde este momento usted lo puede manifestar a través de los siguientes medios: 
                                </p>
                                <ul>
                                    <li>De manera personal en nuestras sucursales</li>
                                    <li>Vía Whatsapp</li>
                                    <li>Vía Correo Electrónico</li>
                                </ul>
                                <p>
                                    La negativa para el uso de sus datos personales para estas finalidades adicionales no podrá ser motivo para que le sean negados los servicios y/o productos que solicita y/o contrata con nosotros. 
                                </p>
                                <p>
                                    <b> ¿Qué datos personales utilizaremos para estos fines y de dónde los obtendremos? </b>
                                </p>
                                <p>
                                    Para las finalidades señaladas en el presente Aviso de Privacidad, podemos recabar sus datos personales de distintas formas: cuando usted nos lo proporciona directamente o cuando obtenemos información a través de otras fuentes que están permitidas por la Ley.
                                </p>
                                <p>
                                    Datos personales que recabamos de forma directa o de fuentes permitidas por la Ley
                                </p>
                                <p>
                                    Algunos de los datos personales que recabamos de forma directa o por otras fuentes permitidas por la Ley son: 
                                    Nombre completo,Dirección / Domicilio.Empresa. Razón Social. Teléfono. Correo Electrónico.
                                </p>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Aviso;