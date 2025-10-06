import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkersResponse } from '@/interfaces/workers/workers-interface';
import { BsArrowRight, BsCardImage } from "react-icons/bs";

import defaultStyle from './site.module.scss';
import winterStyle from '../themes/winter.module.scss'
import darkStyle from '../themes/dark.module.scss';

import Image from "next/image";
import Link from "next/link";

interface Props {
    uuid: string;
    tema: string;
}

const animate = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 }
}

const Workers = ({ uuid, tema }: Props) => {
    const [workers, setWorkers] = useState<WorkersResponse[]>([]);
    const [openUser, setOpenUser] = useState<string>('');

    const getThemeStyle = () => {
        switch(tema) {
            case 'invierno':
                return winterStyle;
            case 'oscuro':
                return darkStyle;
            default:
                return defaultStyle;
        }
    };

    const style = getThemeStyle();

    useEffect(() => {
        const getWorkersCompany = async () => {
            try {
                const response = await fetch(`https://souvenir-site.com/WebTarjet/APIEmpresas/Colaboradores/${uuid}`, {
                    method: 'GET',
                    mode: 'cors'
                });
                const data = await response.json();
                setWorkers(data || []);
            } catch (error) {
                console.error('Error fetching workers:', error);
                setWorkers([]);
            }
        };

        getWorkersCompany();
    }, [uuid]);

    const onOpenUser = (uuid: string) => {
        setOpenUser(uuid === openUser ? '' : uuid);
    };

    if (workers.length === 0) {
        return (
            <div className={style.WorkersSection}>
                {/* El mensaje de vacío se muestra mediante CSS */}
            </div>
        );
    }

    return (
        <div className={style.WorkersSection}>
            
            {workers.map((worker, index) => (
                <div 
                    key={worker.UUID} 
                    className={`${style.Worker} ${openUser === worker.UUID ? style.expanded : ''}`}
                >
                    {/* Header clickeable con mejor UX */}
                    <div 
                        className={`${style.Header} ${index % 2 !== 0 ? style.Header2 : ''} ${openUser === worker.UUID ? style.open : ''}`}
                        onClick={() => onOpenUser(worker.UUID)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && onOpenUser(worker.UUID)}
                    >
                        <div className={style.WorkerInfo}>
                            <div className={style.Image}>
                                <Image 
                                    src={worker.ImgFoto 
                                        ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${worker.ImgFoto}?timestamp=${Date.now()}` 
                                        : '/images/perfil-temporal.webp'
                                    }
                                    alt={`Foto de ${worker.Cargo}`}
                                    width={80}
                                    height={80}
                                    unoptimized
                                />
                            </div>
                            <div className={style.TextInfo}>
                                <span className={style.Name}>{worker.Cargo}</span>
                                <span className={style.Position}>Ver tarjeta de presentación</span>
                            </div>
                        </div>
                        
                        <div className={style.ActionHint}>
                            <span>{openUser === worker.UUID ? 'Ocultar' : 'Ver tarjeta'}</span>
                            <BsArrowRight />
                        </div>
                    </div>

                    {/* Contenido expandido */}
                    <AnimatePresence>
                        {openUser === worker.UUID && (
                            <motion.div 
                                {...animate}
                                className={`${style.Contain} ${index % 2 !== 0 ? style.Contain2 : ''}`}
                            >
                                <div className={style.CardContainer}>
                                    <div className={style.CardHint}>
                                        <BsCardImage /> Haz clic en la tarjeta para ir al perfil
                                    </div>
                                    <Link 
                                        href={`/st/${btoa(worker.TokenId)}`}
                                        className={style.CardLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image 
                                            src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${worker.ImgTarFrente}?timestamp=${Date.now()}`}
                                            alt={`Tarjeta de presentación de ${worker.Cargo}`}
                                            width={400}
                                            height={250}
                                            unoptimized
                                            style={{ 
                                                width: '100%', 
                                                height: 'auto',
                                                maxWidth: '400px'
                                            }}
                                        />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default Workers;