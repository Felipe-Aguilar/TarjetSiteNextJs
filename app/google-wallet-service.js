//google-wallet-service.js
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';

export default class GoogleWalletService {
  constructor(serviceAccountKey) {
    this.serviceAccountKey = serviceAccountKey;
    this.issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || '3388000000022946473';
    this.classId = `${this.issuerId}.tarjet_card_class`;
    console.log('🏗️ GoogleWalletService inicializado con Issuer ID:', this.issuerId);
  }

  // 1. Crear la clase del pass (solo una vez)
  async createPassClass() {
    console.log('📋 Intentando crear/verificar clase:', this.classId);
    
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
      console.log('✅ Clase creada exitosamente:', response.data.id);
      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('ℹ️ La clase ya existe, continuando...');
        return null;
      }
      console.error('❌ Error creando clase:', error.response?.data || error.message);
      throw error;
    }
  }

  // 2. Crear el objeto pass individual
  createPassObject(userData, urlSitio) {
    // Elimina guiones y convierte a minúsculas para consistencia
    const cleanUUID = userData.UUID.replace(/-/g, '').toLowerCase();
    const objectId = `${this.issuerId}.${cleanUUID}`;
    
    console.log('🎫 Creando pass object con ID:', objectId);
  
    return {
      id: objectId,
      classId: this.classId,
      state: 'ACTIVE',
      heroImage: {
        sourceUri: {
          uri: `https://tarjet.site/images/login-ilustracion.png` // Imagen que necesitas crear
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
          body: userData.Empresa || userData.Activid || 'Tarjet'
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
              // 🔧 Usar foto real del usuario o imagen por defecto
              uri: userData.ImgFoto && userData.ImgFoto.startsWith('http') 
                ? userData.ImgFoto
                : `https://tarjet.site/images/perfil-temporal.webp`
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
  console.log('🔐 Generando JWT para:', passObject.id);
  
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: this.serviceAccountKey.client_email,
    aud: 'google',
    typ: 'savetowallet',
    iat: now,
    exp: now + (60 * 60),
    payload: {
      genericObjects: [passObject]
    }
  };

  console.log('📝 Payload del JWT:', JSON.stringify(payload, null, 2));
  
  try {
    const token = jwt.sign(payload, this.serviceAccountKey.private_key, {
      algorithm: 'RS256'
    });
    
    console.log('✅ JWT generado exitosamente');
    console.log('📏 Longitud del token:', token.length);
    console.log('🔍 Primeros 50 caracteres:', token.substring(0, 50) + '...');
    
    return token;
  } catch (error) {
    console.error('❌ Error generando JWT:', error);
    throw error;
  }
}

  // 4. Crear la URL completa para guardar en Google Wallet
  async createSaveToWalletUrl(userData, urlSitio) {
    console.log('🎯 Creando URL completa para:', userData.Nom);
    
    try {
      const passObject = this.createPassObject(userData, urlSitio);
      const jwtToken = this.generateWalletJWT(passObject); // Quita el await aquí
      
      console.log('✅ JWT generado:', jwtToken.substring(0, 50) + '...');
      
      const finalUrl = `https://pay.google.com/gp/v/save/${jwtToken}`;
      
      console.log('🔗 URL final generada');
      return finalUrl;
    } catch (error) {
      console.error('💥 Error creando URL de Google Wallet:', error);
      throw error;
    }
  }
}