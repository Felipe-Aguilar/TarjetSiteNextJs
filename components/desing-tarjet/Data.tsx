'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Image from 'next/image';
import Link from 'next/link';

import { UserDataResponse } from '@/interfaces/userData-interface';
import { ListPrefixInterface } from '@/interfaces/design-tarjet/listPrefix-interface';
import { ListSegmentsInterface } from '@/interfaces/design-tarjet/listSegments-interface';
import { ResultUserInterface } from '@/interfaces/resultUser-interface';

import style from './data.module.scss';
import ContactData from './ContactData';
import SocialNetworks from './SocialNetworks';
import UploadImage from '../pop-ups/upload-image/UploadImage';
import EditData from '@/app/api/editData';

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

const Data = ({ userData }: Props) => {
  const [prefixList, setPrefixList] = useState<ListPrefixInterface>();
  const [segments, setSegments] = useState<ListSegmentsInterface>();
  const [name, setName] = useState(userData.Nom);
  const [paternal, setPaternal] = useState(userData.AppP);
  const [maternal, setMaternal] = useState(userData.AppM);
  const [userName, setUserName] = useState(userData.Alias);
  const [businessName, setBusinessName] = useState(userData.NomNegocio);
  const [workPosition, setWorkPosition] = useState(userData.Cargo);
  const [prefix, setPrefix] = useState(userData.Titulo);
  const [activity, setActivity] = useState(userData.Lev3Desc);
  const [segment, setSegment] = useState<SegmentLevel>({
    Descripcion: userData.Lev3Desc,
    Nivel1Desc: userData.Lev1Desc,
    Nivel1Id: userData.Lev1Id,
    Nivel2Desc: userData.Lev2Desc,
    Nivel2Id: userData.Lev2Id,
    Nivel3Id: userData.Lev3Id
  });
  

  const [error, setError] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getListPrefix = async () => {
      const res = await fetch('https://souvenir-site.com/WebTarjet/APICatalogos/ListaTitulos');
      const data = await res.json();
      setPrefixList(data);
    };

    const getSegments = async () => {
      const res = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ObtenerSegmentos?Descripcion=');
      const data = await res.json();
      setSegments(data);
    };

    getListPrefix();
    getSegments();
  }, []);

  const submitData = async () => {
    const dataForm = {
      Alias: userName,
      Nom: name,
      AppP: paternal,
      AppM: maternal,
      Cargo: workPosition,
      Titulo: prefix,
      Lev1Id: segment.Nivel1Id,
      Lev2Id: segment.Nivel2Id,
      Lev3Id: segment.Nivel3Id,
      NomNegocio: businessName,
    };

    await EditData({ userData, dataForm });
  };

  const onChangeUserName = async (name: string) => {
    setUserName(name);

    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Actividad=&Nombre=&Alias=${name}`);
    const data: ResultUserInterface = await response.json();

    const same = data.ListTarjets.find((user) => user.Alias === name);
    if (same) {
      setError((prev) => [...prev, 'Nombre de usuario ya existe']);
    }
  };

  const handleActivitySelect = (option: { label: string; value: string } | null) => {
    if (option) {
      setActivity(option.label);
      const selectedSegment = segments?.ListSegmentos.find(
        (seg) => seg.Descripcion === option.label
      );
      if (selectedSegment) {
        setSegment(selectedSegment);
      }
    } else {
      // Si se borra la opción, limpiamos la actividad
      setActivity('');
      setSegment({
        Descripcion: '',
        Nivel1Desc: '',
        Nivel1Id: '',
        Nivel2Desc: '',
        Nivel2Id: '',
        Nivel3Id: '',
      });
    }
  };  

  const activityOptions = segments?.ListSegmentos.map(seg => ({
    value: seg.Nivel3Id,
    label: seg.Descripcion,
  })) || [];

  return (
    <div className={style.Data}>
      <p>Esta información se mostrará en el directorio</p>

      <div className={style.SubmitImage}>
        <Image
          src={
            userData.ImgFoto
              ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/ImgPerf/${userData.ImgFoto}?timestamp=${Date.now()}`
              : `/images/perfil-temporal.webp`
          }
          alt='Imagen de perfil'
          width={500}
          height={500}
          unoptimized
        />
        <button className='btn' onClick={() => setOpen(true)}>
          Imagen ó Logotipo
          <span>cargar ó cambiar imagen</span>
        </button>
      </div>

      {open && <UploadImage token={userData.TokenId} imageType='PERF' close={() => setOpen(false)} />}

      <form>
        <div className={style.PrefixContainer}>
          <div>
            <span>Prefijo</span>
            <select value={prefix} onChange={(e) => setPrefix(e.target.value)} onBlur={submitData} style={{ borderRadius: '8px' }}>
              {prefixList?.sdtTitulos.map((p) => (
                <option key={p.TituloPersonaId} value={p.TituloPersonaId}>
                  {p.TituloPersonaDesc}
                </option>
              ))}
            </select>
          </div>

          <input
            type='text'
            placeholder='Empresa o tú Nombre (15 caracteres)'
            maxLength={prefix == 'Empr' ? 40 : 15}
            value={name}
            onChange={(e) => setName(prefix == 'Empr' ? e.target.value : e.target.value.trim())}
            onBlur={submitData}
          />
        </div>

        <div className='two'>
          <input
            type='text'
            placeholder='Apellido Paterno (15 caracteres)'
            maxLength={15}
            value={prefix == 'Empr' ? '' : paternal}
            onChange={(e) => setPaternal(e.target.value.trim())}
            onBlur={submitData}
            disabled={prefix == 'Empr'}
          />

          <input
            type='text'
            placeholder='Apellido Materno (15 caracteres)'
            maxLength={15}
            value={prefix == 'Empr' ? '' : maternal}
            onChange={(e) => setMaternal(e.target.value.trim())}
            onBlur={submitData}
            disabled={prefix == 'Empr'}
          />
        </div>

        <div className='two'>
          <input
            type='text'
            placeholder='Nombre de usuario'
            maxLength={15}
            value={userName}
            onChange={(e) => onChangeUserName(e.target.value.trim())}
            onBlur={submitData}
          />
          <span>(con este usuario te podrán encontrar más fácil en el directorio)</span>
        </div>

        <input
          type='text'
          placeholder='Nombre del negocio (30 caracteres)'
          maxLength={30}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          onBlur={submitData}
        />

        <input
          type='text'
          placeholder='Puesto en la Empresa / Negocio'
          maxLength={30}
          value={workPosition}
          onChange={(e) => setWorkPosition(e.target.value)}
          onBlur={submitData}
        />

        <div className={style.SelectWrapper}>
        <label>Buscar actividad</label>
        <Select
            options={activityOptions}
            onChange={handleActivitySelect}
            value={activityOptions.find((opt) => opt.label === activity) || null}
            placeholder='Selecciona o escribe para buscar...'
            isClearable
            classNamePrefix="react-select"
            noOptionsMessage={() => "No se encontraron actividades"}
            loadingMessage={() => "Buscando..."}
            menuPlacement="auto" // Esto hace que el menú se abra hacia arriba o abajo según el espacio disponible
            styles={{
                control: (base) => ({
                ...base,
                minHeight: '50px',
                minWidth: '315px',
                '@media (max-width: 480px)': {
                    minWidth: '270px',
                    minHeight: '55px',
                    fontSize: '14px'
                }
                }),
                menu: (base) => ({
                ...base,
                position: 'absolute',
                zIndex: 20
                }),
                menuList: (base) => ({
                ...base,
                padding: 0,
                display: 'flex',
                'flex-direction': 'column'
                }),
                option: (base) => ({
                ...base,
                whiteSpace: 'normal',
                }),
                dropdownIndicator: (base) => ({
                ...base,
                padding: '10px',
                }),
                clearIndicator: (base) => ({
                ...base,
                padding: '8px',
                }),
            }}
            />
        </div>

        <Link href='/contacto'>Si no aparece tu área, solicítala aquí, con tu apoyo nos ayudas a aprender.</Link>

        <input type='text' disabled placeholder='Categoría*' value={segment?.Nivel1Desc || ''} />
        <input type='text' disabled placeholder='Categoría*' value={segment?.Nivel2Desc || ''} />

        <ContactData userData={userData} />
        <SocialNetworks userData={userData} />
      </form>
    </div>
  );
};

export default Data;
