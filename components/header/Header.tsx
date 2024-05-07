import Image from 'next/image';
import style from './header.module.scss';
import Link from 'next/link';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import NavLinks from './NavLinks';
import MenuMobile from './MenuMobile';

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

const Header = () => {
    return ( 
        <header className={style.Header}>
            <Image 
                src={'/images/logo.svg'}
                alt='Logitpo tarjet - tu tarjeta de presentación virtual'
                width={500}
                height={500}
                priority
            />

            <nav>
                <Link href={'/directorio-tarjet'}>
                    <Image 
                        src={'/images/icono-lupa-header.svg'}
                        alt='Icono lupa'
                        width={50}
                        height={50}
                    />
                </Link>

                <a href={'https://shop.tarjet.mx/'}>
                    <Image 
                        src={'/images/icono-bolsa-header.svg'}
                        alt='Icono lupa'
                        width={50}
                        height={50}
                    />
                </a>

                <div className={style.LinkDesk}>
                    <NavLinks />
                </div>

                <div className={style.LinkDesk}>
                    { socialLinks.map((social)=>(
                        <a href={social.path} key={social.path} target='_blank'>
                            {social.icon}
                        </a>
                    ))}
                </div>

                <div className={style.MenuMobile}>
                    <MenuMobile />
                </div>

            </nav>
        </header>
    );
}

export default Header;