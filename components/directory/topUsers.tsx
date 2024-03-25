'use client';

import { ListTarjet } from "@/interfaces/topUsers-interface";
import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from 'react-slick';

type Props = {
    data: {
        ListTarjets: ListTarjet[];
    };
}

const TopUsers = ({data}:Props) => {

    // TODO: Modificar estilos según correspondan

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
        <div>
            <h1>Nuevos usuarios tarjet</h1>

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
                                            width={300}
                                            height={300}
                                            priority={false}
                                        />
                                    </Link>
                                </div>
                            )
                        }
                    }
                })}
            </Slider>
            
            <span>Da click sobre la imagen para ver su tarjeta digital</span>
        </div>
    );
}

export default TopUsers;