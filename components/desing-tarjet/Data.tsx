import { useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';
import { ListPrefixInterface } from '@/interfaces/design-tarjet/listPrefix-interface';
import { ListSegmentsInterface } from '@/interfaces/design-tarjet/listSegments-interface';
import { ResultUserInterface } from '@/interfaces/resultUser-interface';

import Image from 'next/image';
import style from './data.module.scss';
import Link from 'next/link';
import ContactData from './ContactData';
import SocialNetworks from './SocialNetworks';
import UploadImage from '../pop-ups/upload-image/UploadImage';
import EditData from '@/app/api/editData';
import DataSuccessfully from '../pop-ups/data-successfully/DataSuccessfully';
import { useRouter } from 'next/navigation';

interface Props {
    userData: UserDataResponse;
}

interface SegmentLevel {
    Descripcion: string;
    Nivel1Desc: string;
    Nivel1Id: string;
    Nivel2Desc: string;
    Nivel2Id: string;
    Nivel3Id: string;
}

const Data = ( {userData}:Props ) => {

    const router = useRouter();

    // *Listado de Prefijos y segmentos
    const [prefixList, setPrefixList] = useState<ListPrefixInterface>();
    const [segments, setSegments] = useState<ListSegmentsInterface>();

    useEffect(()=>{

        const getListPrefix = async () => {
            const response = await fetch('https://souvenir-site.com/WebTarjet/APICatalogos/ListaTitulos',{
                method: 'GET',
                mode: 'cors',
            });

            const data = await response.json();

            setPrefixList(data);
        }

        const getSegments = async() => {
            const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ObtenerSegmentos?Descripcion=', {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            setSegments(data);
        }

        getListPrefix();
        getSegments();

    },[]);

    const [name, setName] = useState<string>(userData.Nom);
    const [paternal, setPaternal] = useState<string>(userData.AppP);
    const [maternal, setMaternal] = useState<string>(userData.AppM);
    const [userName, setUserName] = useState<string>(userData.Alias);
    const [businessName, setBusinessName] = useState<string>(userData.NomNegocio);
    const [workPosition, setWorkPosition] = useState<string>(userData.Cargo);
    const [prefix, setPrefix] = useState<string>(userData.TituloDes);
    const [activity, setActivity] = useState<string>(userData.Lev3Desc);
    const [segment, setSegment] = useState<SegmentLevel>({
        Descripcion: userData.Lev3Desc,
        Nivel1Desc: userData.Lev1Desc,
        Nivel1Id: userData.Lev1Id,
        Nivel2Desc: userData.Lev2Desc,
        Nivel2Id: userData.Lev2Id,
        Nivel3Id: userData.Lev3Id
    })

    // *Busca de actividad - datalist
    const SearchActivity = async (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

        setActivity(e.target.value);

        if (e.target.value) {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ObtenerSegmentos?Descripcion=${e.target.value}`, {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            setSegment(data.ListSegmentos[0]);
        }
    }

    // *Comprobar nombre de usuario
    const onChangeUserName = async (name:string) => {
        setUserName(name);

        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Actividad=&Nombre=&Alias=${name}`, {
            method: 'GET',
            mode: 'cors'
        });

        const data:ResultUserInterface = await response.json();

        const same = data.ListTarjets.find(user => user.Alias === name);

        if (same) {
            setError([...error, 'Nombre de usuario ya existe']);
        }
    }

    // *Guardar datos formulario
    const [error, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataForm = {
            "Alias": userName,
            "Nom": name,
            "AppP": paternal,
            "AppM": maternal,
            "Cargo": workPosition,
            "Titulo": prefix,
            "Lev1Id": segment.Nivel1Id,
            "Lev2Id": segment.Nivel2Id,
            "Lev3Id": segment.Nivel3Id,
            "NomNegocio": businessName,
        }

        await EditData({ userData, dataForm });

        setTimeout(()=>{
            setSuccess(true);

            setTimeout(()=>{
                router.replace(`/disena-tarjet/${btoa(userData.TokenId)}`);
                setSuccess(false);
            }, 2500)
        }, 1000)
    }

    // *Abrir Subir imagen
    const [open, setOpen] = useState<boolean>(false);

    return ( 
        <div className={style.Data}>
            <p>Esta información se mostrará en el directorio</p>

            <div className={style.SubmitImage}>
                <Image 
                    src={userData.ImgFoto
                        ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${userData.ImgFoto}?timestamp=${Date.now()}`
                        : `/images/perfil-temporal.webp`
                    }
                    alt='Imagen de perfil'
                    width={500}
                    height={500}
                />

                <button className='btn' onClick={()=>setOpen(true)}>
                    Imagen ó Logotipo
                    <span>cargar ó cambiar imagen</span>
                </button>
            </div>

            { open && (
                <UploadImage token={userData.TokenId} imageType={'PERF'} close={()=>setOpen(false)}/>
            )}

            <form onSubmit={onSubmitForm}>
                <div className={style.PrefixContainer}>
                    <div>
                        <span>Prefijo</span>
                        <select 
                            value={prefix} 
                            onChange={(e)=>setPrefix(e.target.value)} 
                            style={{borderRadius: '8px'}}
                        >
                            { prefixList?.sdtTitulos.map((prefixOption)=>(
                                <option 
                                    value={prefixOption.TituloPersonaDesc} 
                                    key={prefixOption.TituloPersonaId}
                                >{prefixOption.TituloPersonaDesc}</option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="text" 
                        placeholder='Empresa o tú Nombre (10 caracteres)'
                        maxLength={10}
                        value={name}
                        onChange={(e)=>setName(e.target.value.trim())}
                    />
                </div>

                <div className='two'>
                    <input 
                        type="text" 
                        placeholder='Apellido Paterno (10 caracteres)'
                        maxLength={10}
                        value={paternal}
                        onChange={(e)=>setPaternal(e.target.value.trim())}
                    />

                    <input 
                        type="text" 
                        placeholder='Apellido Materno (10 caracteres)'
                        maxLength={10}
                        value={maternal}
                        onChange={(e)=>setMaternal(e.target.value.trim())}
                    />
                </div>

                <div className='two'>
                    <input 
                        type="text" 
                        placeholder='Nombre de usuario'
                        maxLength={15}
                        value={userName}
                        onChange={(e)=>onChangeUserName(e.target.value.trim())}
                    />

                    <span>(con este usuario te podrán encontrar más fácil en el directorio)</span>
                </div>

                <input 
                    type="text" 
                    placeholder='Nombre del negocio (30 caracteres)'
                    maxLength={30}
                    value={businessName}
                    onChange={(e)=>setBusinessName(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder='Puesto en la Empresa / Negocio'
                    maxLength={30}
                    value={workPosition}
                    onChange={(e)=>setWorkPosition(e.target.value)}
                />

                <input 
                    className={style.DataList}
                    type="text" 
                    placeholder='Buscar actividad'
                    list='activity-list'
                    maxLength={80}
                    value={activity}
                    onChange={(e)=>SearchActivity(e)}
                />

                <datalist id='activity-list' className={style.DataList}>
                    {segments?.ListSegmentos.map((segment)=>(
                        <option value={segment.Descripcion} key={segment.Nivel3Id}></option>
                    ))}
                </datalist>

                <select className={style.DataListSelect} value={activity} onChange={(e)=>SearchActivity(e)}>
                    { segments?.ListSegmentos.map((segment)=>(
                        <option value={segment.Descripcion} key={segment.Nivel3Id}>{segment.Descripcion}</option>
                    )) }
                </select>

                <Link href={'/contacto'}>
                    Si no aparece tu área, solicítala aquí, con tu apoyo nos ayudas a aprender.
                </Link>

                <input 
                    type="text" 
                    disabled
                    placeholder='Categoría*'
                    value={segment.Nivel1Desc}
                />

                <input 
                    type="text" 
                    disabled
                    placeholder='Categoría*'
                    value={segment.Nivel2Desc}
                />

                <ContactData userData={userData}/>
                <SocialNetworks userData={userData}/>

                <button type='submit' className='btn' style={{marginTop: '16px'}}>
                    Guardar datos de tarjeta
                </button>
            </form>

            { success && (
                <DataSuccessfully />
            )}
        </div>
    );
}

export default Data;