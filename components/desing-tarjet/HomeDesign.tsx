'use client';

import { useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';

import style from './home.module.scss';
import Data from './Data';
import DesignCard from './DesignCard';
import userData from '@/app/api/userData';

interface Props {
    userData: UserDataResponse;
}

const HomeDesign = ( {userData}:Props ) => {

    const [order, setOrder] = useState(1);

    return ( 
        <div className={style.HomeDesign}>
            <h2>Diseña tu tarjet</h2>

            <div className={style.BarButtons}>
                <button 
                    className={`${style.btn1} ${order == 1 ? style.active : ''}`}
                    onClick={()=>setOrder(1)}
                >
                    <span>1</span>
                    Tus datos
                </button>
                <button 
                    className={`${style.btn2} ${order == 2 ? style.active : ''}`}
                    onClick={()=>setOrder(2)}
                >
                    <span>2</span>
                    Diseño de fondo
                </button>
            </div>

            <hr/>

            { order == 1 && <Data userData={userData}/> }
            { order == 2 && <DesignCard userData={userData}/>}
        </div>
    );
}

export default HomeDesign;