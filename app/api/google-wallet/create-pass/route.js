// app/api/google-wallet/create-pass/route.js
import GoogleWalletService from "../../../google-wallet-service.js";


export async function POST(request) {
  try {
    console.log('🔍 Iniciando creación de Google Wallet...');
    const { userData, urlSitio } = await request.json();
    
    if (!userData || !urlSitio) {
      return Response.json({ 
        error: 'Datos faltantes: userData y urlSitio son requeridos' 
      }, { status: 400 });
    }

    console.log('📋 Datos recibidos:', {
      usuario: userData.Nom,
      urlSitio: urlSitio
    });

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

    console.log('🏗️ Creando clase de pass...');
    await walletService.createPassClass();
    
    console.log('🔗 Generando URL de Wallet...');
    const walletUrl = await walletService.createSaveToWalletUrl(userData, urlSitio);
    
    console.log('✅ URL generada exitosamente');
    return Response.json({ walletUrl });
    
  } catch (error) {
    console.error('❌ Error en API Google Wallet:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    return Response.json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Contacta al administrador'
    }, { status: 500 });
  }
}