//validate-credentials.js

import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config({ path: '.env' });

async function validateCredentials() {
    console.log('🔍 Validando credenciales de Google Wallet...\n');

    // 1. Verificar variables de entorno
    const requiredVars = [
        'GOOGLE_CLOUD_PROJECT_ID',
        'GOOGLE_WALLET_PRIVATE_KEY_ID', 
        'GOOGLE_WALLET_PRIVATE_KEY',
        'GOOGLE_WALLET_CLIENT_EMAIL',
        'GOOGLE_WALLET_CLIENT_ID',
        'GOOGLE_WALLET_ISSUER_ID'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.log('❌ Variables de entorno faltantes:');
        missing.forEach(varName => console.log(`   - ${varName}`));
        process.exit(1);
    }
    
    console.log('✅ Todas las variables de entorno están presentes\n');

    // 2. Validar formato de private key
    const privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY;
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') || 
        !privateKey.includes('-----END PRIVATE KEY-----')) {
        console.log('❌ Formato de private key incorrecto');
        console.log('   Debe incluir -----BEGIN PRIVATE KEY----- y -----END PRIVATE KEY-----');
        process.exit(1);
    }
    
    console.log('✅ Formato de private key válido\n');

    // 3. Probar autenticación con Google
    try {
        const serviceAccountKey = {
            type: "service_account",
            project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
            private_key_id: process.env.GOOGLE_WALLET_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_WALLET_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_WALLET_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_WALLET_CLIENT_ID,
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        };

        console.log('🔐 Probando autenticación...');
        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccountKey,
            scopes: ['https://www.googleapis.com/auth/wallet_object.issuer']
        });

        const authClient = await auth.getClient();
        console.log('✅ Autenticación exitosa\n');

        // 4. Probar acceso a Google Wallet API
        console.log('🎫 Probando acceso a Google Wallet API...');
        const walletobjects = google.walletobjects({
            version: 'v1',
            auth: authClient
        });

        const response = await walletobjects.genericclass.list({
  issuerId: process.env.GOOGLE_WALLET_ISSUER_ID
});
        console.log('✅ Acceso a Google Wallet API exitoso');
        console.log(`📋 Clases encontradas: ${response.data.resources?.length || 0}\n`);

        // 5. Verificar permisos específicos
        const classId = `${process.env.GOOGLE_WALLET_ISSUER_ID}.test_class`;
        console.log('🔧 Probando creación de clase de prueba...');
        
        try {
            await walletobjects.genericclass.insert({
                requestBody: {
                    id: classId,
                    classTemplateInfo: {
                        cardTemplateOverride: {
                            cardRowTemplateInfos: []
                        }
                    }
                }
            });
            console.log('✅ Permisos de creación funcionando');
        } catch (error) {
            if (error.response?.status === 409) {
                console.log('✅ Clase ya existe (permisos OK)');
            } else {
                console.log('❌ Error de permisos:', error.response?.data || error.message);
            }
        }

        console.log('\n🎉 ¡Validación completa! Las credenciales están configuradas correctamente.');

    } catch (error) {
        console.log('❌ Error de autenticación:', error.message);
        
        if (error.message.includes('invalid_grant')) {
            console.log('💡 Posible problema con el formato de private_key');
        } else if (error.message.includes('access_denied')) {
            console.log('💡 Problema de permisos - revisa la configuración en Google Cloud Console');
        }
        
        process.exit(1);
    }
}

validateCredentials().catch(console.error);