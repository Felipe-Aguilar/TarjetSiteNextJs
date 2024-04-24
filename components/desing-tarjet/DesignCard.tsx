import { Fragment, useEffect, useState } from 'react';
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill, BsCaretDownFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { UserDataResponse } from '@/interfaces/userData-interface';
import { ImagesCollectionInterface, ListTarjeta } from '@/interfaces/design-tarjet/imagesCollection-interface';

import style from './design.module.scss';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import PreviewImage from '../pop-ups/preview-image/PreviewImage';

interface Props {
    userData: UserDataResponse;
}

const DesignCard = ({ userData } : Props) => {

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: (
            <div className='custom-arrow custom-prev-arrow'>
                <BsChevronLeft />
            </div>
        ),
        nextArrow: (
            <div className='custom-arrow custom-prev-arrow'>
                <BsChevronRight />
            </div>
        ),
        afterChange: (current:number) =>{
            setCurrentSlide(current + 1);
        }
    }

    const [order, setOrder] = useState<number>(userData.ImgTarFrente ? 3 : 1);
    const [imagesFree, setImagesFree] = useState<ListTarjeta []>();
    const [imagesPremium, setImagesPremium] = useState<ListTarjeta []>();
    const [currentSlide, setCurrentSlide] = useState<number>(1);
    const [showName, setShowName] = useState<boolean>(true);
    const [showWorkStation, setShowWorkStation] = useState<boolean>(true);
    const [showBusinessName, setShowBusinessName] = useState<boolean>(true);
    const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(true);
    const [preview, setPreview] = useState<boolean>(false);

    useEffect(()=>{

        const getImages = async () => {
            const response = await fetch('https://souvenir-site.com/WebTarjet/ApiCatalogos/ListaTarjetas', {
                method: 'GET',
                mode: 'cors'
            })

            const data : ImagesCollectionInterface = await response.json();

            const free = data.ListTarjetas.filter(image => image.TarjetaPremium === 0);
            const premium = data.ListTarjetas.filter(image => image.TarjetaPremium === 1);

            setImagesFree(free);
            setImagesPremium(premium);
        }

        getImages();

    }, [])

    // *Contador de slider regresa a 1 después de cambio de premium o gratuita
    useEffect(()=>{
        setCurrentSlide(1);
    },[order]);

    
    // *Previsualizazión de imagen
    const [premiumPreview, setPremiumPreview] = useState<boolean>(false);
    const [backgroundCard, setBackgroundCard] = useState<ListTarjeta>();
    const [data, setData] = useState<{
        name: string;
        workStation: string;
        businessName: string;
        phone: string;
    }>();

    const onPreview = (premium:boolean) => {

        const data = {
            name: showName ? `${userData.Nom} ${userData.AppP} ${userData.AppM}` : '',
            workStation: showWorkStation ? `${userData.Cargo}` : '',
            businessName: showBusinessName ? `${userData.NomNegocio}` : '',
            phone: showPhoneNumber ? `${userData.Telefono1}` : ''
        }

        setData(data);

        if (!premium) {
            setPremiumPreview(false);
            setBackgroundCard(imagesFree![currentSlide-1]);
            setPreview(true);
        }
        if (premium) {
            setPremiumPreview(true);
            setBackgroundCard(imagesPremium![currentSlide-1]);
            setPreview(true);
        }
    }

    return ( 
        <div className={style.DesignCard}>
            <p>Esta imagen se mostrará en el directorio</p>
            <p className={style.InstructionsTitle}>Instrucciones</p>

            <div className={style.Instructions}>
                <div className={style.InstructionsContainer}>
                    <Bs1CircleFill />

                    <p><span>Escoge tu estilo de tarjeta,</span> puedes elegir una gratuita, adquirir premium o solicitar un diseño personal.</p>
                </div>

                <div className={style.InstructionsContainer}>
                    <Bs2CircleFill />

                    <p><span>Previsualiza tu tarjeta.</span> <br/> Aquí puedes acomodar tu nombre y servicio en la zona que desees de la tarjeta.</p>
                </div>

                <div className={style.InstructionsContainer}>
                    <Bs3CircleFill />

                    <p><span>Guarda la tarjeta.</span></p>
                </div>
            </div>

            <p className={style.Ready}>Listo, ya puedes darle estilo a tu portada.</p>

            <h3>Colecciones</h3>

            <div className={style.ButtonsSelect}>
                <button 
                    className={order === 1 ? style.Selected : ''}
                    onClick={()=>setOrder(1)}
                >
                    <BsCaretDownFill /> Gratuitas
                </button>
                <button 
                    className={`${style.Border} ${order === 2 ? style.Selected : ''}`}
                    onClick={()=>setOrder(2)}
                >
                    <BsCaretDownFill /> Premium
                </button>
                <button 
                    className={order === 3 ? style.Selected : ''}
                    onClick={()=>setOrder(3)}
                >
                    <BsCaretDownFill /> Ver actual
                </button>
            </div>

            { (order === 1 || order === 2) && (
                <div className={style.SliderImages}>
                    { order === 1 && (
                        <Slider {...settings}>
                            { imagesFree?.map((image)=>(
                                <Image 
                                    src={`https://tarjet.site/imagenes/tarjetas_frente/${image.TarjetaImagen}`}
                                    alt='Tarjeta gratuita'
                                    width={820}
                                    height={484}
                                    key={image.TarjetaImagen}
                                    priority={false}
                                />
                            )) }
                        </Slider>
                    ) }
                    
                    { order === 2 && (
                        <Slider {...settings}>
                            { imagesPremium?.map((image)=>(
                                <Image 
                                    src={`https://tarjet.site/imagenes/tarjetas_frente/premium/${image.TarjetaImagen}`}
                                    alt='Tarjeta premium'
                                    width={820}
                                    height={484}
                                    key={image.TarjetaImagen}
                                />
                            )) }
                        </Slider>
                    ) }

                    { order === 1 ? (
                        <span>{currentSlide} de {imagesFree?.length} modelos gratuitos</span>
                    ): (
                        <span>{currentSlide} de {imagesPremium?.length} modelos premium</span>
                    )}

                    <h4>¿Que datos deseas mostrar en tu Tarjeta?</h4>
                    <div className={style.Options}>
                        <div className={style.Option}>
                            <input type="checkbox" checked={showName} onChange={()=>setShowName(!showName)} id='name'/>
                            <label htmlFor='name'>{userData.Nom} {userData.AppP} {userData.AppM}</label>
                        </div>

                        <div className={style.Option}>
                            <input type="checkbox" checked={showWorkStation} onChange={()=>setShowWorkStation(!showWorkStation)} id='work'/>
                            <label htmlFor='work'>{userData.Cargo}</label>
                        </div>

                        <div className={style.Option}>
                            <input type="checkbox" checked={showBusinessName} onChange={()=>setShowBusinessName(!showBusinessName)} id='business'/>
                            <label htmlFor='business'>{userData.NomNegocio}</label>
                        </div>

                        <div className={style.Option}>
                            <input type="checkbox" checked={showPhoneNumber} onChange={()=>setShowPhoneNumber(!showPhoneNumber)} id='phone'/>
                            <label htmlFor='phone'>{userData.Telefono1}</label>
                        </div>
                    </div>

                    { order === 1 && (
                        <button className='btn' onClick={()=>onPreview(false)}>Previsualizar</button>
                    )} 

                    { order === 2 && (
                        <button 
                            className='btn'
                            disabled={!userData.Premium ? false : true}
                            onClick={()=>onPreview(true)}
                        >
                            Previsualizar
                        </button>
                    )} 
                </div>
            ) }

            { order === 3 && (
                <div className={style.Actual}>
                    <span>Tarjeta personalizada actual</span>

                    { userData.ImgTarFrente ? (
                        <Image 
                            src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/${userData.ImgTarFrente}`}
                            alt='Tarjeta de presentación'
                            width={820}
                            height={484}
                            quality={100}
                        />
                    ): (
                        <p>Aún no cuentas con una tarjeta personalizada</p>
                    )}
                </div>
            )}

            <Link href={`/mi-perfil/${btoa(userData.TokenId)}`}>
                Regresar a perfil (x)
            </Link>

            { preview && 
                <PreviewImage 
                    token={userData.TokenId}
                    premiumPreview={premiumPreview} 
                    backgroundCard={backgroundCard!} 
                    data={data!} 
                    close={()=>setPreview(false)}
                /> 
            }
        </div>
    );
}

export default DesignCard;