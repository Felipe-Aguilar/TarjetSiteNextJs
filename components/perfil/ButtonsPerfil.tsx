'use client';

import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsQuestionCircleFill } from 'react-icons/bs';

import style from './buttons-perfil.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    token: string;
}

const ButtonsPerfil = ( {token}:Props ) => {

    const [open, setOpen] = useState<string>('');

    const buttonsInfo = [
        {
            title: 'Edita / Crea tu Tarjeta', 
            color: '#d2dfe5', 
            subTitle: 'Tu tarjeta digital', 
            firstText: 'Contiene tus datos de contacto y la información con la cuál podrás ser encontrado en el directorio Tarjet.',
            image: '/images/ilustracion-perfil-1.webp',
            secondText: '',
            path: `/disena-tarjet/`,
        },
        {
            title: 'Edita los servicios que ofreces', 
            color: '#c1e0c9', 
            subTitle: 'Micrositio Web ', 
            firstText: 'Es tu propio espacio en donde describes tus servicios e imágenes de lo que haces. Funciona como tu propio sitio Web.',
            image: '/images/ilustracion-perfil-2.webp',
            secondText: '',
            path: `/disena-micro-sitio/`,
        },
        {
            title: 'Tarjetero Virtual', 
            color: '#d9d1ea', 
            subTitle: 'Tarjetero personal', 
            firstText: 'Aquí puedes guardar y administrar todos los usuarios Tarjet de tu interés, para poder disponer de su información más fácil.',
            image: '/images/ilustracion-perfil-3.webp',
            secondText: 'Revisa y comparte a quien tu quieras, cualquier usuario Tarjet',
            path: `/`,
        },
    ]
    
    // *Abrir y cerrar info de botón
    const onClickButton = ( title:string ) => {
        setOpen( title === open ? '' : title);
    }

    const animation = {
        initial: { height: 0, opacity: 0 },
        animate: {height: 'auto', opacity: 1},
        exit: {height: 0, opacity: 0}
    }

    return ( 
        <div className={style.ButtonsPerfil}>
            {buttonsInfo.map((button)=>(
                <Fragment key={button.title}>
                    <div>
                        <Link href={`${button.path}${btoa(token)}`} style={{background: button.color}}>
                            {button.title}
                        </Link>

                        <button onClick={()=>onClickButton(button.title)} style={{background: button.color}}>
                            <BsQuestionCircleFill />
                        </button>
                    </div>

                    <span onClick={()=>onClickButton(button.title)}>¿Para que sirve?</span>

                    {
                        <AnimatePresence>
                            { open === button.title && (
                                <motion.div {...animation} className={style.Info}>
                                    <h6>{button.subTitle}</h6>
                                    <p>{button.firstText}</p>
                                    <Image 
                                        src={button.image}
                                        alt='Ilustración de botón con información'
                                        width={400}
                                        height={400}
                                    />
                                    {button.secondText && <p>{button.secondText}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    }
                </Fragment>
            ))}
        </div>
    );
}

export default ButtonsPerfil;