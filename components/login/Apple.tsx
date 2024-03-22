'use client';

import AppleLogin from 'react-apple-login';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Apple = () => {

    const router = useRouter();

    const appleLogin = async ( response? : any  ) => {

        console.log(response);

        const idToken = await response.authorization.id_token;
        const decodedToken = jwtDecode(idToken);

        console.log(idToken);

        const responseCode = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ValidarCodigoOTP', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "RegistroUsu": {
                    "Nombre": response.user?.name.firstName ? response.user.name.firstName : '',
                    "ApellidoPat": response.user?.name.lastName ? response.user.name.lastName : '',
                    "ApellidoMat": "",
                    "Codigo": decodedToken.sub,
                    "Correo": response.user?.email ? response.user.email : '',
                    "Password": decodedToken.sub,
                    "TipoAut": "A"
                }
            })
        });

        const data = await responseCode.json();

        console.log(data);

        if (data.Token) {
            localStorage.setItem('SessionData', JSON.stringify(data));

            router.push(`/${btoa(data.Token)}`);

            return;
        }

        const responseLogin = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/Login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "Cuenta": "",
                "Password": decodedToken.sub,
                "tipoLogin": "A"
            })
        });

        const dataLogin = await responseLogin.json();

        console.log(dataLogin);

        localStorage.setItem('SessionData', JSON.stringify(dataLogin));
        router.push(`/${btoa(dataLogin.Token)}`);
    }

    return ( 
        <AppleLogin 
            clientId="site.tarjet.client"
            redirectURI="https://tarjet.site"
            state='origin:web'
            scope = "name email"
            responseType={"code"} 
            responseMode={"query"}  
            callback={appleLogin}
            usePopup={true}
            render={(props) => (
                <button onClick={props.onClick} disabled={props.disabled}>
                    <Image 
                        src={'/images/icono-apple.svg'}
                        alt='icono apple'
                        width={200}
                        height={200}
                    />
                    Apple
                </button>
            )}
        />
    );
}

export default Apple;