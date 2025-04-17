import { Fragment } from "react";
import style from './mxm.module.scss';
import Image from "next/image";
import ButtonsSiteMxm from "@/components/profile-mxm/ButtonsSite";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const metadata = {
    title: 'Perfil - Tarjet',
    description: 'Perfil - Tarjet',
    openGraph: {
        title: `MXM COLLECTION FABRICANTES DE ROPA`,
        description: `¡Hola! Somos MXM COLLECTION, te comparto mi perfil Tarjet donde podrás ver más acerca de mi trabajo. Explora mi tarjeta digital en tarjet.site. ¡Conecta fácilmente con profesionales y emprendedores en un solo clic!"`,
        url: 'https://tarjet.site',
        siteName: 'tarjet.site',
        images: [
            {
                url: 'https://www.tarjet.site/mxm/perfil.webp',
                width: 500,
                height: 500,
            },
        ],
        locale: 'es_MEX',
        type: 'website',
    },
};

const SellersArray = [ 
    {name: 'Ely', path: 'YjkzYWM0YTQ1', image: 'mxmely.gif'},
    {name: 'Roberto', path: 'YjI5ZDFmNjY1', image: 'mxmroberto.gif'},
    {name: 'Paula', path: 'NjZkM2ViZWYw', image: 'mxmpaula.gif'},
    {name: 'Karla', path: 'YjIxMzg0MDE3', image: 'mxmkarla.gif'},
    {name: 'Monse', path: 'MWY3Y2UwOTNl', image: 'mxmmonse.gif'},
    {name: 'Cinthia', path: 'N2ZhZmQwZTFl', image: 'mxmcinthia.gif'},
    {name: 'Citlalli', path: 'ZGQxYmYzNGZi', image: 'mxmcitlalli.gif'},
]

const PageMxmx = () => {

    const Sellers = SellersArray.sort(()=> Math.random()-0.5);

    return ( 
        <div className="greenWhite">
            <div className="background">
                <Fragment>
                    <div className={`body ${style.MxmProfile}`}>
                        <div className="contain">
                            <div className={style.Head}>
                                <Image 
                                    src={'/mxm/encabezado.webp'}
                                    alt="Encabezado perfil mxm"
                                    width={800}
                                    height={800}
                                    className={style.HeadImage}
                                    unoptimized
                                />

                                <div className={style.ProfileInfo}>
                                    <Image 
                                        src={'/mxm/perfil.webp'}
                                        alt="imagen de perfil"
                                        width={200}
                                        height={200}
                                        unoptimized
                                    />

                                    <h1>Mxm Collection <br/> <span>Fabricantes de ropa de moda para dama</span></h1>
                                </div>
                            </div>

                            <ButtonsSiteMxm />

                            <hr/>

                            <div className={style.Services}>
                                <h2>Ropa de moda para dama</h2>
                                <Image 
                                    src={'/images/icono-servicios.svg'}
                                    alt="icono servicios"
                                    width={90}
                                    height={90}
                                    className={style.Icon}
                                />

                                <p>Servicios</p>
                                <ul>
                                    <li>Tendencia y modelos exclusivos todos los días.</li>
                                    <li>La mejor calidad del mercado a precios competitivos para que lleves tu negocio a otro nivel.</li>
                                    <li>Envíos express nacionales e internacionales.</li>
                                    <li>Asesoría personalizada con ejecutivos expertos en ventas.</li>
                                    <li>Desarrollo de modelos personalizados y exclusivos con tu propia etiqueta.</li>
                                    <li>Producciones limtiadas garantizando tu mejor margen de ganancia.</li>
                                    <li>Compras solo lo que necesites, no corridas, no paquetes.</li>
                                    <li>Productos 100% nacionales.</li>
                                </ul>
                            </div>

                            <hr/>

                            <div className={style.Sellers} id='SellersSection'>
                                <Image 
                                    src={'/mxm/icono-folleto.svg'}
                                    alt="icono de servicio"
                                    width={90}
                                    height={90}
                                    className={style.Icon}
                                    unoptimized
                                />

                                <div className={style.Head}>
                                    <h3>¡Elige a tu <br/> <span>asesora mxm</span> <br /> ideal para tí!</h3>
                                </div>

                                { Sellers.map((seller)=>(
                                    <div className={style.Seller} key={seller.name}>
                                        <Image 
                                            src={`/mxm/${seller.image}`}
                                            alt="gift vendedora mxmx"
                                            width={600}
                                            height={600}
                                            unoptimized
                                            className={style.Gif}
                                        />

                                        <Image 
                                            src={'/mxm/logo-blanco.svg'}
                                            alt="logo mxm"
                                            width={300}
                                            height={300}
                                            unoptimized
                                            className={style.Logo}
                                        />

                                        <div className={style.Contact}>
                                            <h4>{seller.name}</h4>

                                            <Link href={`/st/${seller.path}`}>
                                                Contactarse
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                <Image 
                                    src={'/mxm/footer.webp'}
                                    alt="imagen promocional"
                                    width={500}
                                    height={600}
                                    className={style.ImageFooter}
                                />

                            </div>

                            <div className={style.Social} id='SocialSection'>
                                
                                <h4>Mis redes sociales</h4>

                                <div className={style.SocialButtons}>
                                    <a href={'https://www.facebook.com/MXMCOLLECTIONFABRICANTES'} className={`${style.Facebook}`}>
                                        <FaFacebookF />
                                    </a>

                                    <a href={'https://www.instagram.com/mxmcollection'} className={`${style.Instagram}`}>
                                        <FaInstagram />
                                    </a>

                                    <a href={'https://www.tiktok.com/@mxmcollectionofficial'} className={`${style.Tiktok}`}>
                                        <FaTiktok />
                                        <FaTiktok className={style.Blue}/>
                                        <FaTiktok className={style.Red}/>
                                    </a>

                                    <a href={''} className={`${style.Twitter} ${style.Disabled}`}>
                                        <FaXTwitter  />
                                    </a>

                                    <a href={''} className={`${style.Youtube} ${style.Disabled}`}>
                                        <FaYoutube />
                                    </a>

                                    <a href={''} className={`${style.Linkedin} ${style.Disabled}`}>
                                        <FaLinkedinIn />
                                    </a>

                                    <a href={''} className={`${style.Telegram} ${style.Disabled}`}>
                                        <FaTelegramPlane />
                                    </a>
                                </div>
                                <hr/>
                                <div className={style.Username}>
                                    <h5>Gracias por visitarme</h5>
                                    <p>Tarjeta digital tarjet</p>
                                    <p>Nombre de usuario en directorio tarjet:</p>
                                    <p className={style.user}>@mxmcollection</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}

export default PageMxmx;