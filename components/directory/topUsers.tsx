'use client';

import { TopUsersResponse, ListTarjet } from "@/interfaces/topUsers-interface";
import Slider from 'react-slick';

type Props = {
    data: {
        ListTarjets: ListTarjet[];
    };
}

const TopUsers = (data:Props) => {

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
                <i className="bi bi-chevron-left" ></i>
            </div>
        ),
        nextArrow: (
            <div className='custom-arrow custom-prev-arrow'>
                <i className="bi bi-chevron-right" ></i>
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

    return ( 
        <div>
            <h1>Nuevos usuarios tarjet</h1>

            <Slider {...settings}>
                {data.ListTarjets.map((tarjet: ListTarjet)=>(
                    <div>

                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default TopUsers;