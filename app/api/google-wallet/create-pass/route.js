// pages/api/oogle-wallet/create-pass.js o app/api/google-wallet/create-pass/route.js

import GoogleWalletService from "../../../../google-wallet-service";

// Credenciales del service account (mejor usar variables de entorno)
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
  client_x509_cert_url: process.env.GOOGLE_WALLET_CLIENT_CERT_URL
};

export async function POST(request) {
  try {
    const { userData, urlSitio } = await request.json();     
    const walletService = new GoogleWalletService(serviceAccountKey);
    await walletService.createPassClass();
    const walletUrl = walletService.createSaveToWalletUrl(userData, urlSitio);
    
    return Response.json({ walletUrl });
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}