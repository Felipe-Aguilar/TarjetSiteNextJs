'use client';

import { Fragment, useEffect, useState } from 'react';
import { BsSearch, BsTrash } from 'react-icons/bs';
import { SegmentsInterface } from '@/interfaces/mytarjet/segments-interface';
import { UsersMyTarjetResultInterface } from '@/interfaces/mytarjet/usersSegments-interface';
import { QRCodeSVG } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';

import style from './mytarjet.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Social from '../pop-ups/social/Social';

interface Props {
    uuId: string;
}

const MyTarjetSearch = ({ uuId }:Props) => {

    const [order, setOrder] = useState<number>(2);
    
    // * Segementos o giro guardados
    const [segments, setSegments] = useState<SegmentsInterface>();
    useEffect(()=>{

        const Segments = async () => {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaSegmentosXUsu/?Usutarjetid=${uuId}&nivel=2`,{
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            setSegments(data);
        }

        Segments();

    }, []);

    // *Orden alfabético
    const AlphabetOrder = async () => {
        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaTarjetero/?Usutarjetid=${uuId}`,{
            method: 'GET',
            mode: 'cors'
        });

        const data = await response.json();

        setResults(data);

        setOrder(1);
    }

    // *Búsqueda por nombre 
    const searchByName = async (name:string) => {
        console.log(name);
    }
    
    // *Selección de Segmento
    const [results, setResults] = useState<UsersMyTarjetResultInterface>();
    const [resultSegment, setResultSegment] = useState<string>('');

    const onSelectSegment = async ( segmentId:string ) => {
        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaTarjetero/?Usutarjetid=${uuId}&Segmentoid=${segmentId}&nivel=2`, {
            method: 'GET',
            mode: 'cors'
        });

        const data = await response.json();

        setResults(data);

        setResultSegment(segmentId === resultSegment ? '' : segmentId);
    }

    // *Abrir información de usuario
    const [openUser, setOpenUser] = useState<string>('');

    const onOpenUser = ( idUser:string ) => {
        setOpenUser(idUser === openUser ? '' : idUser);
    }

    // *Botón de compartir en redes sociales
    const [share, setShare] = useState<boolean>(false);
    const [tokenShare, setTokenShare] = useState<string>('');

    const onShare = (token:string) => {
        setTokenShare(btoa(token));

        setShare(true);
    }

    // *Botón de copiar enlace
    const Copy = (token:string) => {

        const el = document.createElement('textarea');
        el.value = `https://tarjet.site/st/${btoa(token)}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        toast.success('Copiado en el portapapeles', {
            duration: 4500,
            position: 'bottom-center'
        });
    }

    return ( 
        <>
            <div className={style.MyTarjetSearch}>
                <div className={style.OrderContain}>
                    <h4>Ordenar por</h4>

                    <div className={style.Buttons}>
                        <button 
                            className={`btn ${order == 1 ? style.selected : ''}`}
                            onClick={()=>AlphabetOrder()}
                        >
                            Alfabeto A-Z
                        </button>
                        <button 
                            className={`btn ${order == 2 ? style.selected : ''}`}
                            onClick={()=>setOrder(2)}
                        >
                            Giro comercial
                        </button>
                    </div>
                </div>

                <div className={style.SearchContain}>
                    <h4>Búsqueda</h4>

                    <div className={style.Input}>
                        <div><BsSearch /></div>
                        <input 
                            type="text" 
                            placeholder='Escribe el nombre o giro comercial'
                            onChange={(e)=>searchByName(e.target.value)}
                        />
                    </div>
                </div>

                { order == 1 && (
                    <div className={style.Results}>
                        { results?.SDTTarjetsG.map((result)=>(
                            <Fragment key={result.IdUsuario}>
                                <button className={style.UserResult} onClick={()=>onOpenUser(result.IdUsuario)}>
                                    <Image 
                                        src={ result.ImgFoto 
                                            ? `https://tarjet.site/imagenes/perfil-imagenes/${result.ImgFoto}` 
                                            : '/images/perfil-temporal.webp'
                                        }
                                        alt='Imagen de perfil usuario tarjet'
                                        width={100}
                                        height={100}
                                        priority={false}
                                    />
                                    <span>{result.NombreCompleto}</span>
                                </button>
                                {openUser == result.IdUsuario && (
                                    <div className={style.UserResultContainer}>
                                        <Link href={`/st/${btoa(result.UsuToken)}`}>
                                            <Image 
                                                src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/${result.UsuFondoF}`}
                                                alt='tarjeta de presentación'
                                                width={500}
                                                height={300}
                                                className={style.Card}
                                            />
                                        </Link>
                                        <span>DA CLICK SOBRE LA IMAGEN PARA VER TARJETA DIGITAL</span>

                                        <QRCodeSVG 
                                            value={`https://tarjet.site/st/${btoa(result.UsuToken)}`}
                                        />

                                        <span>Escanea con tu smartphone</span>

                                        <div className={style.Buttons}>
                                            <button onClick={()=>onShare(result.UsuToken)}>
                                                <Image 
                                                    src={'/images/btn-compartir-tarjetero.svg'}
                                                    alt='botón compartir'
                                                    width={150}
                                                    height={150}
                                                />
                                                Compartir tarjeta
                                            </button>

                                            <button onClick={()=>Copy(result.UsuToken)}>
                                                <Image 
                                                    src={'/images/btn-copiar.svg'}
                                                    alt='botón copiar'
                                                    width={150}
                                                    height={150}
                                                />

                                                Copiar enlace
                                            </button>
                                        </div>

                                        <button className={style.Eliminate}>
                                            <BsTrash />
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </Fragment>
                        )) }
                    </div>
                )}

                { order == 2 && (
                    <div className={style.Results}>
                        { segments?.SDTSegmentos.map((segment)=>(
                            <Fragment key={segment.SegmentoId}>
                                <button 
                                    className={style.SegmentContainer} 
                                    onClick={()=>onSelectSegment(segment.SegmentoId)}
                                >
                                    {segment.SegmentoDesc}
                                </button>

                                { (results && resultSegment === segment.SegmentoId) && (
                                    results.SDTTarjetsG.map((result)=>(
                                        <Fragment key={result.IdUsuario}>
                                            <button className={style.UserResult} onClick={()=>onOpenUser(result.IdUsuario)}>
                                                <Image 
                                                    src={ result.ImgFoto 
                                                        ? `https://tarjet.site/imagenes/perfil-imagenes/${result.ImgFoto}` 
                                                        : '/images/perfil-temporal.webp'
                                                    }
                                                    alt='Imagen de perfil usuario tarjet'
                                                    width={100}
                                                    height={100}
                                                    priority={false}
                                                />
                                                <span>{result.NombreCompleto}</span>
                                            </button>
                                            {openUser == result.IdUsuario && (
                                                <div className={style.UserResultContainer}>
                                                    <Link href={`/st/${btoa(result.UsuToken)}`}>
                                                        <Image 
                                                            src={`https://tarjet.site/imagenes/tarjetas_frente_usuarios/${result.UsuFondoF}`}
                                                            alt='tarjeta de presentación'
                                                            width={500}
                                                            height={300}
                                                            className={style.Card}
                                                        />
                                                    </Link>
                                                    <span>DA CLICK SOBRE LA IMAGEN PARA VER TARJETA DIGITAL</span>

                                                    <QRCodeSVG 
                                                        value={`https://tarjet.site/st/${btoa(result.UsuToken)}`}
                                                    />

                                                    <span>Escanea con tu smartphone</span>

                                                    <div className={style.Buttons}>
                                                        <button onClick={()=>onShare(result.UsuToken)}>
                                                            <Image 
                                                                src={'/images/btn-compartir-tarjetero.svg'}
                                                                alt='botón compartir'
                                                                width={150}
                                                                height={150}
                                                            />
                                                            Compartir tarjeta
                                                        </button>

                                                        <button onClick={()=>Copy(result.UsuToken)}>
                                                            <Image 
                                                                src={'/images/btn-copiar.svg'}
                                                                alt='botón copiar'
                                                                width={150}
                                                                height={150}
                                                            />

                                                            Copiar enlace
                                                        </button>
                                                    </div>

                                                    <button className={style.Eliminate}>
                                                        <BsTrash />
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </Fragment>
                                    ))
                                )}
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>

            {share && <Social token={tokenShare} close={()=>setShare(false)}/>}
            <Toaster />
        </>
    );
}

export default MyTarjetSearch;