'use client';

import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

const Google = () => {
    return ( 
        <GoogleOAuthProvider clientId="795705014478-07c6ktiul0e14v0phdibro00h17lmgh5.apps.googleusercontent.com">
            <button >
                <Image 
                    src={'/images/icono-google.svg'}
                    alt='icono google'
                    width={200}
                    height={200}
                />
                Google
            </button>
        </GoogleOAuthProvider>
    );
}

export default Google;