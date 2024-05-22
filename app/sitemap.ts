import { ResultUserInterface } from "@/interfaces/resultUser-interface";
import { MetadataRoute } from "next";

export default async function sitemap() : Promise<MetadataRoute.Sitemap>{

    const response = await fetch('https://souvenir-site.com/WebTarjet/APIDirectorio/BuscaXDesc?Radio=0', {method: 'GET'});

    const { ListTarjets } : ResultUserInterface = await response.json();
    
    const porfileEntries : MetadataRoute.Sitemap = ListTarjets.map((profile)=>({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/st/${btoa(profile.Token)}`
    }))

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/directorio-tarjet`
        },
        ...porfileEntries
    ]
}