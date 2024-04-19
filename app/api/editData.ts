import { UserDataResponse } from '@/interfaces/userData-interface';
import userData from '@/app/api/userData';

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
    }
}

export default async function EditData ({ userData, dataForm, contactForm, socialForm }: Props) {
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
                }
        })
    });
}