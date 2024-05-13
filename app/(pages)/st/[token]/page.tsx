import userData from "@/app/api/userData";
import MicrositeHome from "@/components/microsite/MicrositeHome";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

interface Props {
    params: { token:string }
}

export async function generateMetadata({params} : Props): Promise<Metadata>{
    
    const data = await getData(params.token);

    return{
        title: 'Perfil - Tarjet',
        description: 'Perfil - Tarjet',
        openGraph: {
            title: `${data.Nom} ${data.AppP}`,
            description: `¡Hola! Soy ${data.Nom} ${data.AppP}, te comparto mi perfil Tarjet donde podrás ver más acerca de mi trabajo. Explora mi tarjeta digital en tarjet.site. ¡Conecta fácilmente con profesionales y emprendedores en un solo clic!"`,
            url: 'https://tarjet.site',
            siteName: 'tarjet.site',
            images: [
                {
                    url: data.ImgFoto ? `https://souvenir-site.com/WebTarjet/PublicTempStorage/UsuTarjets/${data.ImgTarFrente}` : 'https://www.tarjet.site/_next/image?url=%2Fimages%2Filustracion-perfil-3.webp&w=640&q=75',
                    width: 451,
                    height: 266,
                },
            ],
            locale: 'es_MEX',
            type: 'website',
        },
    }

}

const getData = async ( token:string ) => {
    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaUsuXToken`,{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            "Token": atob(token)
        })
    });

    const userId = await response.json();

    const data = await userData(userId.usuId);

    return data;
}

const SitePage = async ({params} : Props) => {

    const session = await getServerSession();

    const data = await getData(params.token);

    return ( 
        <Fragment>
            <MicrositeHome userData={data} tokenServer={session?.user?.email} uuidServer={session?.user?.name}/>
        </Fragment>
    );
}

export default SitePage;