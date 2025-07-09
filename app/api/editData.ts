import { UserDataResponse } from '@/interfaces/userData-interface';

interface Props {
    userData: UserDataResponse,
    dataForm?: {
        "Alias": string,
        "Nom": string,
        "AppP": string,
        "AppM": string,
        "Cargo": string,
        "Titulo": string,
        "Lev1Id": string,
        "Lev2Id": string,
        "Lev3Id": string,
        "NomNegocio": string,
    },
    contactForm?: {
        "Telefono1": string,
        "Telefono2": string,
        "VerUbicacion": number,
        "Mail": string,
        "Web": string,
        "Calle": string,
        "NumExt": string,
        "CodP": string,
        "Colonia": string,
        "Municip": string,
        "Estado": string,
        "PublicPriva": number,
        "PermitirCalif": number,
        "PermitirComments": number,
        "RangoLocal": string,
        "MapsGeoloc": string,
        "ListDirecciones"?: Array<{
            "DirId": string,
            "DirCalle": string,
            "DirNumExt": string,
            "DirCodP": string,
            "DirCol": string,
            "DirMunicip": string,
            "DirEstado": string,
            "DirMapsGeoloc": string
        }>
    },
    socialForm?: {
        "Facebook": string,
        "Instagram": string,
        "Tiktok": string,
        "Twitter": string,
        "Youtube": string,
        "Telegram": string,
        "Linkedin": string,
        "Google": string,
    },
    servicesForm?: {
        "FirstServices": {
            service1: string;
            service2: string;
            service3: string;
            service4: string;
            service5: string;
            service6: string;
            service7: string;
            service8: string;
        };
        "SecondServices": {
            [key: string]: {
                ServNum: string;
                ServDescrip: string;
                ServSubTitulo: string;
                ServImg: string;
                ServIcono: string;
                ServSiteId: number;
            };
        };
    };
}

export default async function EditData ({ userData, dataForm, contactForm, socialForm, servicesForm }: Props) {
    const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ActualizaUsu', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            "usuId": userData.UUID,
                "ListUsuario": {
                    "UUID": userData.UUID,
                    "TokenId": userData.TokenId,
                    "EmpleadoId": userData.EmpleadoId,
                    "Alias": dataForm?.Alias ?? userData.Alias,
                    "Nom": dataForm?.Nom ?? userData.Nom,
                    "AppP": dataForm?.AppP ?? userData.AppP,
                    "AppM": dataForm?.AppM ?? userData.AppM,
                    "Cargo": dataForm?.Cargo ?? userData.Cargo,
                    "Titulo": dataForm?.Titulo ?? userData.Titulo,
                    "Lev1Id": dataForm?.Lev1Id ?? userData.Lev1Id,
                    "Lev2Id": dataForm?.Lev2Id ?? userData.Lev2Id,
                    "Lev3Id": dataForm?.Lev3Id ?? userData.Lev3Id,
                    "NomNegocio": dataForm?.NomNegocio ?? userData.NomNegocio,
                    "ImgFoto": userData.ImgFoto,
                    "Telefono1": contactForm?.Telefono1 ?? userData.Telefono1,
                    "Telefono2": contactForm?.Telefono2 ?? userData.Telefono2,
                    "VerUbicacion": contactForm?.VerUbicacion ?? userData.VerUbicacion,
                    "Mail": contactForm?.Mail ?? userData.Mail,
                    "Web": contactForm?.Web ?? userData.Web,
                    "Calle": contactForm?.Calle ?? userData.Calle,
                    "NumExt": contactForm?.NumExt ?? userData.NumExt,
                    "CodP": contactForm?.CodP ?? userData.CodP,
                    "Colonia": contactForm?.Colonia ?? userData.Colonia,
                    "Municip": contactForm?.Municip ?? userData.Municip,
                    "MapsGeoloc": contactForm?.MapsGeoloc ?? userData.MapsGeoloc,
                    "Estado": contactForm?.Estado ?? userData.Estado,
                    "PublicPriva": contactForm?.PublicPriva ?? userData.PublicPriva,
                    "PermitirCalif": contactForm?.PermitirCalif ?? userData.PermitirCalif,
                    "PermitirComments": contactForm?.PermitirComments ?? userData.PermitirComments,
                    "Facebook": socialForm?.Facebook ?? userData.Facebook,
                    "Google": socialForm?.Google ?? userData.Google,
                    "Instagram": socialForm?.Instagram ?? userData.Instagram,
                    "Linkedin": socialForm?.Linkedin ?? userData.Linkedin,
                    "Tiktok": socialForm?.Tiktok ?? userData.Tiktok,
                    "Twitter": socialForm?.Twitter ?? userData.Twitter,
                    "Youtube": socialForm?.Youtube ?? userData.Youtube,
                    "Telegram": socialForm?.Telegram ?? userData.Telegram,
                    "RegistroTarjet": true,
                    "ImgHeader": userData.ImgHeader,
                    "ImgTarFrente": userData.ImgTarFrente,
                    "RangoLocal": contactForm?.RangoLocal ?? userData.RangoLocal,
                    // Array de direcciones
                    "ListDirecciones": contactForm?.ListDirecciones ?? userData.ListDirecciones ?? [{
                        "DirId": "1",
                        "DirCalle": contactForm?.Calle ?? userData.Calle,
                        "DirNumExt": contactForm?.NumExt ?? userData.NumExt,
                        "DirCodP": contactForm?.CodP ?? userData.CodP,
                        "DirCol": contactForm?.Colonia ?? userData.Colonia,
                        "DirMunicip": contactForm?.Municip ?? userData.Municip,
                        "DirEstado": contactForm?.Estado ?? userData.Estado,
                        "DirMapsGeoloc": contactForm?.MapsGeoloc ?? userData.MapsGeoloc
                    }],
                    "Serv": [
                        {
                            "ServNum": "1",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service1 : userData.Serv ? userData.Serv![0].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "2",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service2 : userData.Serv ? userData.Serv![1].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "3",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service3 : userData.Serv ? userData.Serv![2].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "4",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service4 : userData.Serv ? userData.Serv![3].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "5",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service9.ServDescrip : userData.Serv ? userData.Serv![4].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service9.ServSubTitulo : userData.Serv ? userData.Serv![4].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service9.ServImg : userData.Serv ? userData.Serv![4].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "6",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service10.ServDescrip : userData.Serv ? userData.Serv![5].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service10.ServSubTitulo : userData.Serv ? userData.Serv![5].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service10.ServImg : userData.Serv ? userData.Serv![5].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "7",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service11.ServDescrip : userData.Serv ? userData.Serv![6].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service11.ServSubTitulo : userData.Serv ? userData.Serv![6].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service11.ServImg : userData.Serv ? userData.Serv![6].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "8",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service12.ServDescrip : userData.Serv ? userData.Serv![7].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service12.ServSubTitulo : userData.Serv ? userData.Serv![7].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service12.ServImg : userData.Serv ? userData.Serv![7].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "9",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service13.ServDescrip : userData.Serv ? userData.Serv![8].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service13.ServSubTitulo : userData.Serv ? userData.Serv![8].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service13.ServImg : userData.Serv ? userData.Serv![8].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "10",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service14.ServDescrip : userData.Serv ? userData.Serv![9].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service14.ServSubTitulo : userData.Serv ? userData.Serv![9].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service14.ServImg : userData.Serv ? userData.Serv![9].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "11",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service15.ServDescrip : userData.Serv ? userData.Serv![10].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service15.ServSubTitulo : userData.Serv ? userData.Serv![10].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service15.ServImg : userData.Serv ? userData.Serv![10].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "12",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service16.ServDescrip : userData.Serv ? userData.Serv![11].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service16.ServSubTitulo : userData.Serv ? userData.Serv![11].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service16.ServImg : userData.Serv ? userData.Serv![11].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "13",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service17.ServDescrip : userData.Serv ? userData.Serv![12].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service17.ServSubTitulo : userData.Serv ? userData.Serv![12].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service17.ServImg : userData.Serv ? userData.Serv![12].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "14",
                            "ServDescrip": servicesForm ? servicesForm.SecondServices.service18.ServDescrip : userData.Serv ? userData.Serv![13].ServDescrip : '',
                            "ServSubTitulo": servicesForm ? servicesForm.SecondServices.service18.ServSubTitulo : userData.Serv ? userData.Serv![13].ServSubTitulo : '',
                            "ServImg": servicesForm ? servicesForm.SecondServices.service18.ServImg : userData.Serv ? userData.Serv![13].ServImg : '',
                            "ServIcono": "",
                            "ServSiteId": 3
                        },
                        {
                            "ServNum": "15",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service5 : userData.Serv ? userData.Serv![14].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "16",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service6 : userData.Serv ? userData.Serv![15].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "17",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service7 : userData.Serv ? userData.Serv![16].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "18",
                            "ServDescrip": servicesForm ? servicesForm.FirstServices.service8 : userData.Serv ? userData.Serv![17].ServDescrip : '',
                            "ServSubTitulo": "",
                            "ServImg": "",
                            "ServIcono": "",
                            "ServSiteId": 1
                        }
                    ]
                }
        })
    });


    const data = await response.json();

    console.log(data);
    console.log('here');
}