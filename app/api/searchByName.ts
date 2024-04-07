export default async function searchByName(name:string, latitude:any, longitude: any) {

    console.log(latitude, longitude);

    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Actividad=&Nombre=${name}&Latitud=${latitude}&Longitud=${longitude}&Radio=3`);

    const data = await response.json();

    if (data.ListTarjets.length === 0) {
        const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Actividad=${name}&Nombre=&Latitud=${latitude}&Longitud=${longitude}&Radio=3`);

        const data = await response.json();

        if (data.ListTarjets.length === 0) {
            const response = await fetch(`https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Actividad=&Nombre=&Alias=${name}&Latitud=${latitude}&Longitud=${longitude}&Radio=3`);

            const data = await response.json();

            return data;
        }

        return data;
    }

    return data; 
}