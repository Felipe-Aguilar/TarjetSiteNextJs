'use client';

import style from './top.module.scss';
import Image from "next/image";
import Link from "next/link";
import Slider from 'react-slick';
import { ListTarjet } from "@/interfaces/topUsers-interface";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
    data: {
        ListTarjets: ListTarjet[];
    };
}

const TopUsers = ({data}:Props) => {

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        autoplaySpeed: 6000,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
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
                breakpoint: 575,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
                }
            }
        ]
    }

    if (!data || !data.ListTarjets) {
        return null; // Si alguno está indefinido, retornamos null para no renderizar nada
    }

    return ( 
        <div className={style.TopUsers}>
            <h1>Nuevos usuarios tarjet</h1>

            <div className={style.Slide}>
                <Slider {...settings}>
                    {data.ListTarjets.map((user)=>{
                        if (user.PublicPriva === 0) {
                            if (user.RegistroTarjet) {
                                return (
                                    <div key={user.IdUsuario}>
                                        <Link href={`/st/${btoa(user.Token)}`}>
                                            <Image 
                                                src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/${user.FondoF}`}
                                                alt="Tarjeta de presentación"
                                                width={800}
                                                height={250}
                                                priority={false}
                                            />
                                        </Link>
                                    </div>
                                )
                            }
                        }
                    })}
                </Slider>
            </div>
            
            <span>Da click sobre la imagen para ver su tarjeta digital</span>
        </div>
    );
}

export default TopUsers;