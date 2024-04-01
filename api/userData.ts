import { UserDataResponse } from "@/interfaces/userData-interface";

export default async function userData (usuId:string):Promise<UserDataResponse> {

    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/Usuario/${usuId}`,{
        method: 'GET',
        mode: 'cors',
        cache: 'no-store'
    });

    const data = await response.json();

    return data;
}