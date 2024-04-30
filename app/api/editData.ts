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
    },
    socialForm?: {
        "Facebook": string,
        "Instagram": string,
        "Tiktok": string,
        "Twitter": string,
        "Youtube": string,
        "Telegram": string,
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

    await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ActualizaUsu', {
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
                    "Estado": contactForm?.Estado ?? userData.Estado,
                    "PublicPriva": contactForm?.PublicPriva ?? userData.PublicPriva,
                    "PermitirCalif": contactForm?.PermitirCalif ?? userData.PermitirCalif,
                    "PermitirComments": contactForm?.PermitirComments ?? userData.PermitirComments,
                    "Facebook": socialForm?.Facebook ?? userData.Facebook,
                    "Instagram": socialForm?.Instagram ?? userData.Instagram,
                    "Tiktok": socialForm?.Tiktok ?? userData.Tiktok,
                    "Twitter": socialForm?.Twitter ?? userData.Twitter,
                    "Youtube": socialForm?.Youtube ?? userData.Youtube,
                    "Telegram": socialForm?.Telegram ?? userData.Telegram,
                    "RegistroTarjet": userData.RegistroTarjet,
                    "ImgHeader": userData.ImgHeader,
                    "ImgTarFrente": userData.ImgTarFrente,
                    "Serv": [
                        {
                            "ServNum": "1",
                            "ServDescrip": servicesForm?.FirstServices.service1,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "2",
                            "ServDescrip": servicesForm?.FirstServices.service2,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "3",
                            "ServDescrip": servicesForm?.FirstServices.service3,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "4",
                            "ServDescrip": servicesForm?.FirstServices.service4,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "5",
                            "ServDescrip": servicesForm?.SecondServices.service9.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service9.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service9.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "6",
                            "ServDescrip": servicesForm?.SecondServices.service10.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service10.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service10.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "7",
                            "ServDescrip": servicesForm?.SecondServices.service11.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service11.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service11.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "8",
                            "ServDescrip": servicesForm?.SecondServices.service12.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service12.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service12.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "9",
                            "ServDescrip": servicesForm?.SecondServices.service13.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service13.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service13.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "10",
                            "ServDescrip": servicesForm?.SecondServices.service14.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service14.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service14.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "11",
                            "ServDescrip": servicesForm?.SecondServices.service15.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service15.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service15.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "12",
                            "ServDescrip": servicesForm?.SecondServices.service16.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service16.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service16.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "13",
                            "ServDescrip": servicesForm?.SecondServices.service17.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service17.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service17.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "14",
                            "ServDescrip": servicesForm?.SecondServices.service18.ServDescrip,
                            "ServSubTitulo": servicesForm?.SecondServices.service18.ServSubTitulo,
                            "ServImg": servicesForm?.SecondServices.service18.ServImg,
                            "ServIcono": "",
                            "ServSiteId": 2
                        },
                        {
                            "ServNum": "15",
                            "ServDescrip": servicesForm?.FirstServices.service5,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "16",
                            "ServDescrip": servicesForm?.FirstServices.service6,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "17",
                            "ServDescrip": servicesForm?.FirstServices.service7,
                            "ServSiteId": 1
                        },
                        {
                            "ServNum": "18",
                            "ServDescrip": servicesForm?.FirstServices.service8,
                            "ServSiteId": 1
                        }
                    ]
                }
        })
    });
}