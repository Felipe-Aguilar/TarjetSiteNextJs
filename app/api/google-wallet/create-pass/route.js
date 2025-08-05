//app/api/google-wallet/create-pass/route.js

import GoogleWalletService from "../../../google-wallet-service.js";

export async function POST(request) {
  try {
    const { userData, urlSitio } = await request.json();
    
    console.log('Inicializando servicio...'); // Debug
    const walletService = new GoogleWalletService({
      type: "service_account",
      project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
      private_key_id: process.env.GOOGLE_WALLET_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_WALLET_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_WALLET_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.GOOGLE_WALLET_CLIENT_CERT_URL
    });

    console.log('Creando clase...'); // Debug
    await walletService.createPassClass();
    
    console.log('Generando URL...'); // Debug
    const walletUrl = await walletService.createSaveToWalletUrl(userData, urlSitio);
    
    return Response.json({ walletUrl });
  } catch (error) {
    console.error('Error en API:', error); // Debug detallado
    return Response.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}