'use client';

import AppleLogin from 'react-apple-login';
import { jwtDecode } from 'jwt-decode';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const Apple = () => {

    const appleLogin = async ( response? : any  ) => {

        console.log(response);

        const idToken = await response.authorization.id_token;
        const decodedToken = jwtDecode(idToken);

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

        if (data.Token) {
            const usuId= await data.usuId;
            const token= await data.Token;

            await signIn('credentials', {usuId, token, callbackUrl: '/registro'});

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

        const usuId= await dataLogin.usuId;
        const token= await dataLogin.Token;

        await signIn('credentials', {usuId, token, callbackUrl: '/login'});
    }

    return ( 
        <AppleLogin 
            clientId="site.tarjet.client"
            redirectURI="https://tarjet-site.vercel.app/login"
            state='origin:web'
            scope = "name email"
            responseType={"code"} 
            responseMode={"query"}  
            callback={appleLogin}
            // usePopup={true}
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