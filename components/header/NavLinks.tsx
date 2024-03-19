import Link from "next/link";

interface Props {
    close?: () => void;
}

const Navigation = [
    {path: 'https://shop.tarjet.mx/', text: 'Tienda'},
    {path: '/empresas', text: 'Empresas'},
    {path: 'https://tarjet.mx/#/hazte-premium', text: 'Planes'},
    {path: 'https://tarjet.mx/#/acerca-tarjet', text: 'Acerca de Tarjet'},
    {path: '/directorio', text: 'Directorio Tarjet'},
    {path: '/login', text: 'Mi tarjetero'},
]

const NavLinks = ( {close} : Props ) => {
    return ( 
        <>
            { Navigation.map((link)=>(
                <Link key={link.path} href={link.path} onClick={close}>
                    {link.text}
                </Link>
            ))}
        </>
    );
}

export default NavLinks;