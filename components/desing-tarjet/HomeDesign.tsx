'use client';

import { useState, useEffect } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';

import style from './home.module.scss';
import Data from './Data';
import DesignCard from './DesignCard';
import userData from '@/app/api/userData';

interface Props {
    // userData: UserDataResponse;
    uuid: string;
}

const HomeDesign = ( {uuid}:Props ) => {

    const [order, setOrder] = useState(1);

    const [data, setData] = useState<UserDataResponse>();

    useEffect(()=>{
        const getData = async ()=> {
            const response = await userData(uuid);

            setData(response);

            console.log(response);
        }

        getData();

    },[])

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

            {/* { order == 1 && <Data userData={userData}/> }
            { order == 2 && <DesignCard userData={userData}/>} */}
            { order == 1 && data && <Data userData={data}/>}
            { order == 2 && data && <DesignCard userData={data}/>}
        </div>
    );
}

export default HomeDesign;