'use client';

import Link from 'next/link';
import style from './buttons-perfil.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import Image from 'next/image';

const animation = {
    initial: { height: 0 },
    animate: { height: 630},
    exit: {height: 0}
}

const ButtonsPerfil = () => {

    // TODO: Pendiente la animación y open de la información, también de el height del bloque de info para mobile

    const [open, setOpen] = useState<boolean>();

    const buttonsInfo = [
        {
            title: 'Edita / Crea tu Tarjeta', 
            color: '#d2dfe5', 
            subTitle: 'Tu tarjeta de presentación', 
            firstText: 'Es la primera tarjeta que verán las personas cuando busquen una actividad que se relacione contigo en el directorio Tarjet.',
            image: '/images/ilustracion-perfil-1.webp',
            secondText: 'Asegúrate que se vea Super padre para que llame la atención de quien te solicite...',
            path: `/disena-tu-tarjet/{btoa(token)}`
        },
        {
            title: 'Edita / Crea tu TarjetSite', 
            color: '#c1e0c9', 
            subTitle: 'Tarjeta digital Tarjet (micrositio web)', 
            firstText: 'Es tu propio espacio en donde configuras todas las formas de contactarte, acceso a tu whatsapp, redes sociales, correo, ubicación, servicios que ofreces, etc.',
            image: '/images/ilustracion-perfil-2.webp',
            secondText: 'Es la Tarjeta Virtual que compartirás a las personas, ponle tu propio estilo y crea un buen impacto cuando visiten tu perfil.',
            path: `/disena-tu-tarjetsite/{btoa(token)}`
        },
        {
            title: 'Tarjetero Virtual', 
            color: '#d9d1ea', 
            subTitle: 'Tarjetero personal', 
            firstText: 'Aquí puedes guardar y administrar todos los usuarios Tarjet de tu interés, para poder disponer de su información más fácil.',
            image: '/images/ilustracion-perfil-3.webp',
            secondText: 'Revisa y comparte a quien tu quieras, cualquier usuario Tarjet',
            path: `/{btoa(token)}}`
        },
    ]

    const [retract, setRetract] = useState<string>();

    const onClickButton = (title:string) => {
        setOpen(!open);
        setRetract(title);
    }
    
    return ( 
        <div className={style.ButtonsPerfil}>
            {buttonsInfo.map((button)=>(
                <>
                    <div key={button.title}>
                        <Link href={button.path} style={{background: button.color}}>
                            {button.title}
                        </Link>

                        <button onClick={()=>onClickButton(button.title)} style={{background: button.color}}>
                            <BsQuestionCircleFill />
                        </button>
                    </div>

                    <span onClick={()=>onClickButton(button.title)}>¿Para que sirve?</span>

                    {
                        <AnimatePresence>
                            { retract === button.title && (
                                open &&
                                    <motion.div {...animation} className={style.Info}>
                                        <h6>{button.subTitle}</h6>
                                        <p>{button.firstText}</p>
                                        <Image 
                                            src={button.image}
                                            alt='Ilustración de botón con información'
                                            width={400}
                                            height={400}
                                        />
                                        <p>{button.secondText}</p>
                                    </motion.div>
                            )}
                        </AnimatePresence>
                    }
                </>
            ))}
        </div>
    );
}

export default ButtonsPerfil;