// pages/api/oogle-wallet/create-pass.js o app/api/google-wallet/create-pass/route.js

import GoogleWalletService from "../../../../../google-wallet-service";

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userData, urlSitio } = req.body;

    if (!userData || !urlSitio) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    const walletService = new GoogleWalletService(serviceAccountKey);
    
    // Crear la clase si no existe (solo la primera vez)
    await walletService.createPassClass();
    
    // Generar URL para guardar en Google Wallet
    const walletUrl = walletService.createSaveToWalletUrl(userData, urlSitio);
    console.log('Wallet URL:', walletUrl);
    res.status(200).json({ walletUrl });
  } catch (error) {
    console.error('Error creating Google Wallet pass:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Si usas App Router (Next.js 13+):
// export async function POST(request) {
//   try {
//     const { userData, urlSitio } = await request.json();
//     
//     const walletService = new GoogleWalletService(serviceAccountKey);
//     await walletService.createPassClass();
//     const walletUrl = walletService.createSaveToWalletUrl(userData, urlSitio);
//     
//     return Response.json({ walletUrl });
//   } catch (error) {
//     return Response.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }