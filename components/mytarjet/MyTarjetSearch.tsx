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
import EliminateUser from '../pop-ups/eliminate-user/EliminateUser';

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

    // *Orden Giro Comercial
    const ComercialOrder = () => {
        setName('');
        setOrder(2);
    }

    // *Orden alfabético
    const AlphabetOrder = async () => {

        setName('');

        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaTarjetero/?Usutarjetid=${uuId}`,{
            method: 'GET',
            mode: 'cors'
        });

        const data = await response.json();

        setResults(data);

        setOrder(1);
    }

    // *Búsqueda por nombre 
    const [name, setName] = useState<string>('');

    const searchByName = async (name:string) => {
        setName(name);
        setOrder(1);

        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaTarjetero/?Usutarjetid=${uuId}&Nombre=${name}`, {
            method: 'GET',
            mode: 'cors'
        });

        const data = await response.json();

        setResults(data);
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

    // *Eliminar usuario
    const [eliminate, setEliminate] = useState<boolean>(false);
    const [idUserEliminate, setIdUserEliminate] = useState<string>('');

    const onEliminate = (idEliminate:string) => {
        setIdUserEliminate(idEliminate);
        setEliminate(true);
    }

    return ( 
        <>
            <div className={style.MyTarjetSearch}>
                <div className={style.OrderContain}>
                    <h4>Ordenar por</h4>

                    <div className={style.Buttons}>
                        <button 
                            className={`btn ${(order == 1 && !name) ? style.selected : ''}`}
                            onClick={()=>AlphabetOrder()}
                        >
                            Alfabeto A-Z
                        </button>
                        <button 
                            className={`btn ${order == 2 ? style.selected : ''}`}
                            onClick={()=>ComercialOrder()}
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
                            value={name}
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
                                            ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${result.ImgFoto}` 
                                            : '/images/perfil-temporal.webp'
                                        }
                                        alt='Imagen de perfil usuario tarjet'
                                        width={100}
                                        height={100}
                                        priority={false}
                                        unoptimized
                                    />
                                    <span>{result.NombreCompleto}</span>
                                </button>
                                {openUser == result.IdUsuario && (
                                    <div className={style.UserResultContainer}>
                                        <Link href={`/st/${btoa(result.UsuToken)}`}>
                                            <Image 
                                                src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${result.UsuFondoF}`}
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
                                                    unoptimized
                                                />

                                                Copiar enlace
                                            </button>
                                        </div>

                                        <button className={style.Eliminate} onClick={()=>onEliminate(result.IdUsuario)}>
                                            <BsTrash />
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </Fragment>
                        )) }

                        {results?.SDTTarjetsG.length == 0 && <span>Sin resultados</span>}
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
                                                        ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${result.ImgFoto}` 
                                                        : '/images/perfil-temporal.webp'
                                                    }
                                                    alt='Imagen de perfil usuario tarjet'
                                                    width={100}
                                                    height={100}
                                                    priority={false}
                                                    unoptimized
                                                />
                                                <span>{result.NombreCompleto}</span>
                                            </button>
                                            {openUser == result.IdUsuario && (
                                                <div className={style.UserResultContainer}>
                                                    <Link href={`/st/${btoa(result.UsuToken)}`}>
                                                        <Image 
                                                            src={`https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${result.UsuFondoF}`}
                                                            alt='tarjeta de presentación'
                                                            width={500}
                                                            height={300}
                                                            className={style.Card}
                                                            unoptimized
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

                                                    <button className={style.Eliminate} onClick={()=>onEliminate(result.IdUsuario)}>
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

            { share && <Social token={tokenShare} close={()=>setShare(false)}/> }
            <Toaster />
            { eliminate && 
                <EliminateUser 
                    idUserEliminate={idUserEliminate} 
                    uuId={uuId}
                    close={()=>setEliminate(false)}
                /> 
            }
        </>
    );
}

export default MyTarjetSearch;