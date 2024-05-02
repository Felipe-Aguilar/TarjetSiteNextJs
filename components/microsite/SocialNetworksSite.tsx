import { UserDataResponse } from '@/interfaces/userData-interface';
import style from './site.module.scss';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    userData: UserDataResponse;
}

const SocialNetworsSite = ({userData} :Props) => {
    return ( 
        <div className={style.Social} id='SocialSection'>
            { userData && (
                <Fragment>
                    <h4>Mis redes sociales</h4>

                    <div className={style.SocialButtons}>
                        <a href={userData.Facebook} className={`${style.Facebook} ${!userData.Facebook ? style.Disabled : ''}`}>
                            <FaFacebookF />
                        </a>

                        <a href={userData.Instagram} className={`${style.Instagram} ${!userData.Instagram ? style.Disabled : ''}`}>
                            <FaInstagram />
                        </a>

                        <a href={userData.Tiktok} className={`${style.Tiktok} ${!userData.Tiktok ? style.Disabled : ''}`}>
                            <FaTiktok />
                            <FaTiktok className={style.Blue}/>
                            <FaTiktok className={style.Red}/>
                        </a>

                        <a href={userData.Twitter} className={`${style.Twitter} ${!userData.Twitter ? style.Disabled : ''}`}>
                            <FaTwitter />
                        </a>

                        <a href={userData.Youtube} className={`${style.Youtube} ${!userData.Youtube ? style.Disabled : ''}`}>
                            <FaYoutube />
                        </a>

                        <a href={userData.Pinterest} className={`${style.Linkedin} ${!userData.Pinterest ? style.Disabled : ''}`}>
                            <FaLinkedinIn />
                        </a>

                        <a href={userData.Telegram} className={`${style.Telegram} ${!userData.Telegram ? style.Disabled : ''}`}>
                            <FaTelegramPlane />
                        </a>
                    </div>
                    <hr/>
                    <div className={style.Username}>
                        <h5>Gracias por visitarme</h5>
                        <p>Tarjeta digital tarjet</p>
                        <p>Nombre de usuario en directorio tarjet:</p>
                        <p className={style.user}>{userData.Alias}</p>
                    </div>

                    <div className={style.Info}>
                        <Image 
                            src={'/images/logo.svg'}
                            alt='logo tarjet'
                            width={100}
                            height={100}
                            priority={false}
                        />
                        <p>Conectamos personas con tu negocio</p>
                        <h6>
                            Te agradó esta tarjeta digital <br/>
                            <span>Tú también puedes tener la tuya</span>
                        </h6>
                        <Link href="/login">
                            Solicita gratuitamente tu tarjeta digital Tarjet
                        </Link>
                        <h6>
                            Actualízate <br/>
                            <span>Genera un impacto positivo con tu tarjeta Física tarjet</span>
                        </h6>
                        <Image 
                            src={'/images/tarjeta-fisica.webp'}
                            alt='Tarjeta física tarjet'
                            width={200}
                            height={200}
                            priority={false}
                            className={style.Card}
                        />
                        <a href="" className={style.Orange}>
                            Compra tu tarjeta física Tarjet con NFC <br/>
                            <span>Es personalizada</span>
                        </a>
                        <h6>
                            <span>Hagamos Networking</span> <br/>
                    
                            En nuestro directorio puedes ser encontrado fácilmente por personas que buscan lo que haces
                        </h6>
                        <Link href="/login" className={style.Violet}>
                            Regístrate gratuitamente <span>y accede a tu tarjetero digital tarjet</span>
                        </Link>
                    </div>

                    <Link href={'/directorio-tarjet'} className={style.LinkFooter}>
                        Te invitamos a conocernos, visita nuestro sitio oficial
                    </Link>
                </Fragment>
            )}
        </div>
    );
}

export default SocialNetworsSite;