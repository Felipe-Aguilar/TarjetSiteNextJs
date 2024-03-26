'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import style from './search.module.scss';

import { useEffect, useState } from 'react';
import { BsSearch, BsXLg } from 'react-icons/bs';
import { SDTCategoria } from '@/interfaces/categoriesDirectory-infertace';
import { AnimatePresence, motion } from 'framer-motion';
import { ResultUserInterface } from '@/interfaces/resultUser-interface';
import Link from 'next/link';

type Props = {
    categories: {
        SDTCategorias: SDTCategoria[];
    };
}

const Search = ( {categories}:Props ) => {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    initialSlide: 0,
                    infinite: true,
                    arrows:true
                }
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    initialSlide: 0,
                    infinite: true,
                    arrows:true
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    initialSlide: 0,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    arrows:true,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 0,
                    infinite: true,
                    arrows:true
                }
            }
        ]
    };

    const animation = {
        initial: {scale: 0},
        animate: {scale: 1},
        exti: {scale: 0}
    }

    // *Pregunta la posición 
    const [position, setPosition] = useState<GeolocationPosition>();

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                setPosition(position);
            });   
        }
    },[]);


    const [results, setResults] = useState<ResultUserInterface>();
    const [search, setSearch] = useState<boolean>(false);
    const [range, setRange] = useState<boolean>(false);

    // * Busqueda por Nombre
    const [name, setName] = useState<string>('');

    const onSearchName = async (name:string) => {
        setName(name);

        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Actividad=&Nombre=${name}&Latitud=${position?.coords.latitude}&Longitud=${position?.coords.longitude}&Radio=3`);

        const data = await response.json();

        setResults(data);
        setSearch(true);
    }

    const deleteName = () => {
        setSearch(false);
        setName('');
    }

    // * Selección de categoría
    const [categorySelected, setCategorySelected] = useState<string>('');

    const onClickCategory = (idCategory : string) => {
        setCategorySelected(idCategory);
    }

    return ( 
        <div className={style.Search}>
            <div className={style.HeaderSearch}>
                <div className={style.SwitchToggle}>
                    <span className={style.Text}>Mostrar únicamente usuarios cercanos 3km</span>

                    <div className={style.container}>
                        <input 
                            type="checkbox" 
                            className={style.checkbox} 
                            id="checkbox" 
                            checked={range}
                            onChange={()=>setRange(!range)}
                        />
                        <label className={style.switch} htmlFor="checkbox">
                            <span className={style.slider}></span>
                        </label>
                    </div>
                </div>

                <div className={style.SearchContainer}>
                    <div className={style.Search}>
                        <BsSearch />
                    </div>
                    <input 
                        type="text" 
                        placeholder='Nombre, actividad ó usuario tarjet'
                        value={name}
                        onChange={(e)=>onSearchName(e.target.value)}
                    />
                    <div className={style.Delete}>
                        <button onClick={deleteName}>
                            <BsXLg />
                        </button>
                    </div>
                </div>
            </div>

            <div className={style.Categories}>
                <Slider {...settings}>
                    {categories.SDTCategorias.map((category, index)=>(
                        <div className={style.contain} key={category.Id}>
                            <button 
                                onClick={()=>onClickCategory(category.Id)}
                                className={category.Id === categorySelected ? style.Selected : ''}
                            >
                                <Image 
                                    src={`https://tarjet.site/imagenes/icons/icon-${index+1}.svg`}
                                    alt='ícono de categoría'
                                    width={200}
                                    height={200}
                                />
                                {category.Desc}
                            </button>
                        </div>
                    ))}
                </Slider>
            </div>

            { search && 
                <AnimatePresence>
                    {search &&
                        <motion.div {...animation} className={style.ResultsSearch}>
                            <button className={style.Close}>
                                <BsXLg />
                                Cerrar ventana de resultados
                            </button>

                            <div className={style.ResultContainer}>
                                {results?.ListTarjets.map((user)=>(
                                    <div key={user.IdUsuario} className='userResult'>
                                        <div className='header'>
                                            <Image 
                                                src={
                                                    user.ImgFoto 
                                                    ? `https://tarjet.site/imagenes/perfil-imagenes/PERF_${user.Token}.webp`
                                                    : '/images/perfil-temporal.webp'
                                                }
                                                alt='Foto de perfil'
                                                width={200}
                                                height={200}
                                                priority={false}
                                            />
                                            <div className='text'>
                                                <h5>{user.NombreCompleto}</h5>
                                                <span>{user.Actividad}</span>
                                            </div>
                                        </div>
                                        <div className='card'>
                                            <Link href={`/st/${btoa(user.Token)}`}>
                                                <Image 
                                                    src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/TFRE_${user.Token}.webp`}
                                                    alt='Tarjeta de presentación'
                                                    width={500}
                                                    height={190}
                                                    priority={false}
                                                />
                                            </Link>
                                        </div>
                                        <div className='footer'>
                                            <span>Da click sobre la imagen para ver tarjeta digital</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            }
        </div>
    );
}

export default Search;