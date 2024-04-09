import { useEffect, useState } from 'react';
import { UserDataResponse } from '@/interfaces/userData-interface';
import { ListPrefixInterface } from '@/interfaces/design-tarjet/listPrefix-interface';
import { ListSegmentsInterface } from '@/interfaces/design-tarjet/listSegments-interface';

import Image from 'next/image';
import style from './data.module.scss';
import Link from 'next/link';
import ContactData from './ContactData';

interface Props {
    userData: UserDataResponse;
}

const Data = ( {userData}:Props ) => {

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
    const [activity, setActivity] = useState<string>(userData.Lev3Desc);
    const [segment1, setSegment1] = useState<string>(userData.Lev1Desc);
    const [segment2, setSegment2] = useState<string>(userData.Lev2Desc);

    // *Busca de actividad - datalist
    const SearchActivity = async (e : React.ChangeEvent<HTMLInputElement>) => {

        setActivity(e.target.value);

        if (e.target.value) {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ObtenerSegmentos?Descripcion=${e.target.value}`, {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            setSegment1(data.ListSegmentos[0]?.Nivel1Desc);
            setSegment2(data.ListSegmentos[0]?.Nivel2Desc);
        }
    }

    return ( 
        <div className={style.Data}>
            <p>Esta información se mostrará en el directorio</p>

            <div className={style.SubmitImage}>
                <Image 
                    src={`https://tarjet.site/imagenes/perfil-imagenes/${userData.ImgFoto}`}
                    alt='Imagen de perfil'
                    width={500}
                    height={500}
                />

                <button className='btn'>
                    Imagen ó Logotipo
                    <span>cargar ó cambiar imagen</span>
                </button>
            </div>
            <form>
                <div className={style.PrefixContainer}>
                    <div>
                        <span>Prefijo</span>
                        <select>
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
                        onChange={(e)=>setUserName(e.target.value)}
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

                <select className={style.DataListSelect}>
                    <option value="" key="">Hola mundo</option>
                </select>

                <Link href={'/contacto'}>
                    Si no aparece tu área, solicítala aquí, con tu apoyo nos ayudas a aprender.
                </Link>

                <input 
                    type="text" 
                    disabled
                    placeholder='Categoría*'
                    value={segment1}
                />

                <input 
                    type="text" 
                    disabled
                    placeholder='Categoría*'
                    value={segment2}
                />

                <ContactData userData={userData}/>
            </form>
        </div>
    );
}

export default Data;