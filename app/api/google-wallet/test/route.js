import GoogleWalletService from "../../../google-wallet-service.js";

export async function GET() {
  try {
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

    // Crear clase de prueba
    await walletService.createPassClass();
    
    // Crear objeto de prueba
    const testUserData = {
      UUID: "test-12345",
      Nom: "Test",
      AppP: "User",
      AppM: "Example",
      Empresa: "Tarjet",
      Activid: "Testing"
    };
    
    const testUrl = "https://tarjet.site/st/test";
    const passObject = walletService.createPassObject(testUserData, testUrl);
    const jwtToken = walletService.generateWalletJWT(passObject);
    
    return Response.json({ 
      success: true, 
      jwt: jwtToken,
      jwtLength: jwtToken.length,
      preview: jwtToken.substring(0, 100) + '...'
    });
    
  } catch (error) {
    return Response.json({ 
      error: 'Error en test', 
      details: error.message 
    }, { status: 500 });
  }
}