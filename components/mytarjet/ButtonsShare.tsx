'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import QrPop from "../pop-ups/qr/QrPop";
import Social from "../pop-ups/social/Social";

const ButtonsShare = () => {
    
    const pathname = usePathname();

    const [qr, setQr] = useState<boolean>(false);
    const [social, setSocial] = useState<boolean>(false);

    const copy = () => {
        const el = document.createElement('textarea');
        el.value = `https://tarjet.site/st${pathname}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    return ( 
        <>
            <button onClick={()=>setQr(true)}>
                <Image 
                    src={'/images/btn-qr.svg'}
                    alt="Botón compartir por qr"
                    width={150}
                    height={150}
                />
                Tu Qr
            </button>
            <button onClick={()=>setSocial(true)}>
                <Image 
                    src={'/images/btn-compartir-tarjetero.svg'}
                    alt="Btn compartir por redes sociales"
                    width={150}
                    height={150}
                />
                Compartir
            </button>
            <button onClick={copy}>
                <Image 
                    src={'/images/btn-copiar.svg'}
                    alt="Botón copiar url"
                    width={150}
                    height={150}
                />
                Copiar
            </button>
            <Link href={'/directorio-tarjet'}>
                <Image 
                    src={'/images/btn-directorio.svg'}
                    alt="Botón directorio tarjet"
                    width={150}
                    height={150}
                />
                Directorio
            </Link>
            
            { qr && <QrPop close={()=>setQr(false)}/> }
            { social && <Social close={()=>setSocial(false)}/> }
        </>
    );
}

export default ButtonsShare;