import userData from "@/app/api/userData";
import MicrositeHome from "@/components/microsite/MicrositeHome";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

interface Props {
    params: { token:string }
}

export const metadata = {
    title: 'Perfil - Tarjet',
    description: 'Perfil - Tarjet',
    openGraph: {
        title: 'Felipe',
        description: 'Felipe description',
        url: 'https://nextjs.org', //TODO: No muestra nada en el open, pero si en la data, recomendaría si usarla
        siteName: 'tarjet.site',
        images: [
            {
                url: 'https://www.tarjet.site/images/logo.svg',
                width: 800,
                height: 600,
            },
        ],
        locale: 'es_MEX',
        type: 'website',
    },
};

const SitePage = async ({params} : Props) => {

    const session = await getServerSession();

    const response = await fetch(`https://souvenir-site.com/WebTarjet/APIUsuDtos/ConsultaUsuXToken`,{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            "Token": atob(params.token)
        })
    });

    const userId = await response.json();

    const data = await userData(userId.usuId);

    console.log(data);

    return ( 
        <Fragment>
            <MicrositeHome tokenServer={session?.user?.email} uuidServer={session?.user?.name}/>
        </Fragment>
    );
}

export default SitePage;