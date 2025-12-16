'use client';
import { useEffect, useState } from 'react';
import styles from './ChristmasEffects.module.scss';

const ChristmasEffects = () => {
    const [isDecember, setIsDecember] = useState(false);

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        setIsDecember(currentMonth === 11); // 11 = diciembre 
    }, []);

    if (!isDecember) return null;

    // Generar copos de nieve
    const snowflakes = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        animationDelay: Math.random() * 5,
        fontSize: Math.random() * 10 + 10
    }));

    return (
        <div className={styles.christmasContainer}>
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className={styles.snowflake}
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        fontSize: `${flake.fontSize}px`
                    }}
                >
                    ❅
                </div>
            ))}
        </div>
    );
};

export default ChristmasEffects;