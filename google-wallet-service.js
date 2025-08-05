// google-wallet-service.js
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';

class GoogleWalletService {
  constructor(serviceAccountKey) {
    this.serviceAccountKey = serviceAccountKey;
    this.issuerId = '3388000000022946473'; // Se obtiene de Google Cloud Console
    this.classId = `${this.issuerId}.tarjet_card_class`;
  }

  // 1. Crear la clase del pass (solo una vez)
  async createPassClass() {
    const auth = new google.auth.GoogleAuth({
      credentials: this.serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/wallet_object.issuer']
    });

    const walletobjects = google.walletobjects({
      version: 'v1',
      auth: auth
    });

    const genericClass = {
      id: this.classId,
      classTemplateInfo: {
        cardTemplateOverride: {
          cardRowTemplateInfos: [
            {
              twoItems: {
                startItem: {
                  firstValue: {
                    fields: [
                      {
                        fieldPath: 'object.textModulesData["name"]'
                      }
                    ]
                  }
                },
                endItem: {
                  firstValue: {
                    fields: [
                      {
                        fieldPath: 'object.textModulesData["company"]'
                      }
                    ]
                  }
                }
              }
            },
            {
              oneItem: {
                item: {
                  firstValue: {
                    fields: [
                      {
                        fieldPath: 'object.textModulesData["website"]'
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    };

    try {
      const response = await walletobjects.genericclass.insert({
        requestBody: genericClass
      });
      console.log('Clase creada:', response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('La clase ya existe');
        return null;
      }
      throw error;
    }
  }

  // 2. Crear el objeto pass individual
  createPassObject(userData, urlSitio) {
    const objectId = `${this.issuerId}.${userData.UUID}`;
    
    return {
      id: objectId,
      classId: this.classId,
      state: 'ACTIVE',
      heroImage: {
        sourceUri: {
          uri: 'images/login-ilustracion.png'
        },
        contentDescription: {
          defaultValue: {
            language: 'es',
            value: 'Tarjet Digital Card'
          }
        }
      },
      textModulesData: [
        {
          id: 'name',
          header: 'Nombre',
          body: `${userData.Nom} ${userData.AppP} ${userData.AppM}`
        },
        {
          id: 'company',
          header: 'Empresa',
          body: userData.Empresa || 'Tarjet'
        },
        {
          id: 'website',
          header: 'Sitio Web',
          body: urlSitio
        }
      ],
      linksModuleData: {
        uris: [
          {
            uri: urlSitio,
            description: 'Ver Tarjet Digital',
            id: 'tarjet_link'
          }
        ]
      },
      imageModulesData: [
        {
          mainImage: {
            sourceUri: {
              uri: userData.Foto || 'https://your-domain.com/images/default-avatar.png'
            },
            contentDescription: {
              defaultValue: {
                language: 'es',
                value: 'Foto de perfil'
              }
            }
          },
          id: 'profile_image'
        }
      ],
      barcode: {
        type: 'QR_CODE',
        value: urlSitio,
        alternateText: 'Escanea para ver la tarjeta'
      }
    };
  }

  // 3. Generar el JWT para Google Wallet
  generateWalletJWT(passObject) {
    const payload = {
      iss: this.serviceAccountKey.client_email,
      aud: 'google',
      typ: 'savetowallet',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
      payload: {
        genericObjects: [passObject]
      }
    };

    return jwt.sign(payload, this.serviceAccountKey.private_key, {
      algorithm: 'RS256'
    });
  }

  // 4. Crear la URL completa para guardar en Google Wallet
  createSaveToWalletUrl(userData, urlSitio) {
    const passObject = this.createPassObject(userData, urlSitio);
    const jwtToken = this.generateWalletJWT(passObject);
    
    return `https://pay.google.com/gp/v/save/${jwtToken}`;
  }
}

export default GoogleWalletService;