import { BsFacebook, BsInstagram } from 'react-icons/bs';
import style from './footer.module.scss';
import Link from 'next/link';

const navLinks = [
    {path: '/aviso-de-privacidad', name: 'Aviso de privacidad'},
    {path: '/contacto', name: 'Contacto'},
    {path: '/login-partners', name: 'Tarjet para partners'},
]

const Footer = () => {
    return ( 
        <footer className={style.Footer}>
            <img 
                src="/images/logo-gris.svg" 
                alt="Logotipo tarjet - tu tarjeta de presentación virtual" 
            />

            <div className={style.Social}>
                <a href="https://www.facebook.com/profile.php?id=100095193982785&mibextid=ZbWKwL" target='_blank'>
                    <BsFacebook />
                </a>
                <a href="https://www.instagram.com/tarjetmx/" target='_blank'>
                    <BsInstagram />
                </a>    
            </div>

            <nav>
                { navLinks.map((link)=>(
                    <Link href={link.path} key={link.path}>
                        {link.name}
                    </Link>
                ))}
            </nav>
        </footer>
    );
}

export default Footer;