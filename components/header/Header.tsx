'use client';

import Image from 'next/image';
import style from './header.module.scss';
import Link from 'next/link';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import NavLinks from './NavLinks';
import MenuMobile from './MenuMobile';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserTokenResponse } from '@/interfaces/usuToken-interface';

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

    const [data, setData] = useState<UserTokenResponse>();
    const pathname = usePathname();

    useEffect(()=>{
        GetDataGeneral();
    },[pathname]);
    
    
    const GetDataGeneral = async () => {
        const segments = pathname.split('/');

        const id = segments[2];

        if (segments.length == 3) {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaUsuXToken`,{
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "Token": atob(id)
                })
            });
        
            const data = await response.json();
    
            setData(data);
            console.log(data);
        }else{
            setData(undefined);
        }
    }

    if (data?.premium) return null;

    return ( 
        <header 
            className={style.Header}
            style={data?.premium ? {justifyContent : "end"} : {}}
        >

            { !data?.premium && (
                <Image 
                    src={'/images/logo.svg'}
                    alt='Logitpo tarjet - tu tarjeta de presentación virtual'
                    width={500}
                    height={500}
                    priority
                />
            ) }

            <nav>
                <Link href={'/directorio-tarjet'}>
                    <Image 
                        src={'/images/icono-lupa-header.svg'}
                        alt='Icono lupa'
                        width={50}
                        height={50}
                    />
                </Link>

                <a href={'https://tarjetshop.com/'}>
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

function getData(arg0: string) {
    throw new Error('Function not implemented.');
}
