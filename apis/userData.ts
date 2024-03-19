export default async function userData () {

    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/Usuario/45e27785-e9ba-4f0c-8b99-256901a589b8`,{
        method: 'GET',
        mode: 'cors',
    });

    const data = await response.json();

    return data;
}