'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import style from './search.module.scss';
import Link from 'next/link';
import searchByName from '@/api/searchByName';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SDTCategoria } from '@/interfaces/categoriesDirectory-infertace';
import { ResultUserInterface } from '@/interfaces/resultUser-interface';
import { BsChevronLeft, BsChevronRight, BsSearch, BsXLg } from 'react-icons/bs';
import { json } from 'stream/consumers';
import { OptionCategoriesInterface } from '@/interfaces/optionCategories-interface';

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
        setCategorySelected('');
        setOptionsCategories(undefined);

        const data = await searchByName(name, position?.coords.latitude, position?.coords.longitude);

        setResults(data);
        setSearch(true);

        if (name.length == 0) {
            setResults(undefined);
            setSearch(false);
        }
    }

    const deleteName = () => {
        setSearch(false);
        setName('');
        setCategorySelected('');
    }

    // * Selección de categoría
    const [categorySelected, setCategorySelected] = useState<string>('');
    const [optionCategories, setOptionsCategories] = useState<OptionCategoriesInterface>();

    const onClickCategory = async (idCategory : string) => {
        setCategorySelected(idCategory);

        setResults(undefined);
        setName('');

        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaCategorias?Nivel1=${idCategory}&Nivel2=`);

        const data = await response.json();

        setOptionsCategories(data);

        setSearch(true);
    }

    // *Búsqueda de usuarios por categoría
    const onSearchCategory = async (idCategory:string) => {
        
        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/ConsultaTarjetCategorias?Nivel1=&Nivel2=${idCategory}`);

        const data = await response.json();

        setResults(data);

        setOptionsCategories(undefined);
    }
    
    // * Cerrar resultados
    const onCloseResults = () => {
        setSearch(false);
        setName('');
        setCategorySelected('');
    }

    return ( 
        <div className={style.Search}>
            <div className={style.HeaderSearch}>
                <div className={style.Contain}>
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
                <motion.div {...animation} className={style.ResultsSearch}>
                    <button className={style.Close} onClick={onCloseResults}>
                        <BsXLg />
                        Cerrar ventana de resultados
                    </button>

                    { results &&
                        <div className={style.ResultContainer}>
                            { results?.ListTarjets.map((user)=>(
                                user.PublicPriva === 0 && (
                                    user.RegistroTarjet && (    
                                        range ? parseFloat(user.Distancia) <= 3 && (
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
                                        )
                                        :
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
                                    )
                                )
                            ))}
                        </div>
                    }

                    {results?.ListTarjets.length == 0 && <p className={style.NoResults}>No se encontraron resultados</p>}

                    { optionCategories &&
                        <>
                            {optionCategories.SDTCategorias.map((level)=>(
                                <div key={level.Id} className={style.optionCategories}>
                                    {level.Level2.map((category)=>(
                                        <button key={category.Id} onClick={()=>onSearchCategory(category.Id)}>
                                            {category.Desc}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </>
                    }
                </motion.div>
            }
        </div>
    );
}

export default Search;