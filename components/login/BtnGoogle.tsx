import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const BtnGoogle = () => {

    const login = useGoogleLogin({
        onSuccess: tokenResponse => Register(tokenResponse)
    })

    const Register = async (tokenResponse :any) => {

        const response = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/ValidarCodigoOTP',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "RegistroUsu": {
                    "Nombre": "",
                    "ApellidoPat": "",
                    "ApellidoMat": "",
                    "Codigo": tokenResponse.access_token,
                    "Correo": "",
                    "Password": "",
                    "TipoAut": "G"
                }
            })
        });

        const data = await response.json();

        if (data.Token) {
            const usuId = await data.usuId;
            const token = await data.Token;
            
            await signIn('credentials', {usuId, token, callbackUrl: '/registro'});

            return;
        }

        const responseLogin = await fetch('https://souvenir-site.com/WebTarjet/APIUsuDtos/Login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "Cuenta": "",
                "Password": tokenResponse.access_token,
                "tipoLogin": "G"
            })
        });

        const dataLogin = await responseLogin.json();
        
        if (dataLogin.Token) {
            const usuId = await dataLogin.usuId;
            const token = await dataLogin.Token;

            await signIn('credentials', { usuId, token, callbackUrl: '/login'});
        }

    }

    return ( 
        <button 
            onClick={()=>login()}
        >
            <Image 
                src={'/images/icono-google.svg'}
                alt='icono google'
                width={200}
                height={200}
            />
            Google
        </button>
    );
}

export default BtnGoogle;