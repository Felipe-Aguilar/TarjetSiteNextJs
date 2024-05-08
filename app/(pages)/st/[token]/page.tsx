import MicrositeHome from "@/components/microsite/MicrositeHome";
import { getServerSession } from "next-auth";
import { Fragment } from "react";


export const metadata = {
    title: 'Tarjet - Perfil',
    description: 'Perfil Tarjet',
    // openGraph: {
    //     title: 'Felipe',
    //     description: 'Felipe description',
    // },
};

const SitePage = async () => {

    const session = await getServerSession();

    return ( 
        <Fragment>
            <MicrositeHome tokenServer={session?.user?.email} uuidServer={session?.user?.name}/>
        </Fragment>
    );
}

export default SitePage;