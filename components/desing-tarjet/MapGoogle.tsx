import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface Props {
    address: string;
}

const MapGoogle = ({address} : Props) => {

    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(()=>{
        const getAddress = async () => {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCPj4WhXm_VMY3W6MMQ2UwDOdTkrBAednk`);

            const data = await response.json();

            setLatitude(data.results[0].geometry.location.lat);
            setLongitude(data.results[0].geometry.location.lng);
        }

        getAddress();
    });

    return ( 
        <div style={{width: '100%', height: '300px'}}>
            <APIProvider apiKey='AIzaSyCPj4WhXm_VMY3W6MMQ2UwDOdTkrBAednk'>
                <Map zoom={15} center={{lat: latitude, lng: longitude}} mapId={'ab8d519ae945deed'}>
                    <AdvancedMarker position={{lat: latitude, lng: longitude}}></AdvancedMarker>
                </Map>
            </APIProvider>
        </div>
    );
}

export default MapGoogle;