// 'use client';

import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";
import style from './header.module.scss';
import Link from "next/link";

interface Props {
    close?: () => void;
}

const Navigation = [
    {path: 'https://tarjetshop.com/', text: 'Tienda'},
    {path: '/empresas', text: 'Empresas'},
    {path: 'https://tarjet.mx/#/hazte-premium', text: 'Planes'},
    {path: 'https://tarjet.mx/#/acerca-tarjet', text: 'Acerca de Tarjet'},
    {path: '/directorio-tarjet', text: 'Directorio Tarjet'},
    {path: '/login', text: 'Mi tarjetero'},
]

const NavLinks = ( {close} : Props ) => {

    const { data:session } = useSession();

    return ( 
        <Fragment>
            { Navigation.map((link)=>(
                <Link key={link.path} href={link.path} onClick={close}>
                    {link.text}
                </Link>
            ))}

            { session && <button onClick={()=>signOut({callbackUrl: '/login'})} className={style.LogOutButton}>Cerrar sesión</button> }
            
        </Fragment>
    );
}

export default NavLinks;