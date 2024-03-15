'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import BtnGoogle from './BtnGoogle';


const Google = () => {

    return ( 
        <GoogleOAuthProvider clientId="795705014478-07c6ktiul0e14v0phdibro00h17lmgh5.apps.googleusercontent.com">
            <BtnGoogle />
        </GoogleOAuthProvider>
    );
}

export default Google;