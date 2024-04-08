'use client';

import { useState } from 'react';
import style from './home.module.scss';

const HomeDesign = () => {

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
            
        </div>
    );
}

export default HomeDesign;