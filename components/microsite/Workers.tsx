import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkersResponse } from '@/interfaces/workers/workers-interface';
import { BsEjectFill } from "react-icons/bs";

import style from './site.module.scss';
import Image from "next/image";
import Link from "next/link";

interface Props {
    uuid: string;
}

const animate = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {height: 0}
}

const Workers = ({uuid} : Props) => {

    const [workers, setWorkers] = useState<WorkersResponse []>();
    const [openUser, setOpenUser] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    useEffect(()=>{

        const getWorkersCompany = async () => {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIEmpresas/Colaboradores/${uuid}`, {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            setWorkers(data);
        }

        getWorkersCompany();

    }, []);

    const onOpenUser = (uuid:string) => {
        setOpenUser(uuid === openUser ? '' : uuid);
        // setOpen(!open);
    }

    return (
        <div className={style.Workers}>
            { workers?.map((worker, index)=>(
                <div key={worker.UUID} className={style.Worker}>

                    <div className={`${style.Header} ${index == 1 ? style.Header2 : ''}`} onClick={()=>onOpenUser(worker.UUID)}>
                        <span>{worker.Cargo}</span>

                        <div className={style.Image}>
                            <Image 
                                src={`${worker.ImgFoto 
                                    ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${worker.ImgFoto}?timestamp=${Date.now()}` 
                                    : '/images/perfil-temporal.webp'
                                }`}
                                alt="Imagen de perfil usuario"
                                width={80}
                                height={80}
                                unoptimized
                            />
                            <BsEjectFill />
                        </div>
                    </div>

                    <AnimatePresence>
                        {openUser == worker.UUID && (
                            <motion.div {...animate} className={`${style.Contain} ${index == 1 ? style.Contain2 : ''}`}>
                                <Link href={`/st/${btoa(worker.TokenId)}`}>
                                    <Image 
                                        src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${worker.ImgTarFrente}?timestamp=${Date.now()}`}
                                        alt="Tarjeta de presentación"
                                        width={400}
                                        height={300}
                                        unoptimized
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div> 
            ))}
        </div>
    );
}

export default Workers;