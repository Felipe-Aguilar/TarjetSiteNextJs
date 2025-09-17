// google-wallet-service.js
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default class GoogleWalletService {
  constructor(serviceAccountKey) {
    this.serviceAccountKey = serviceAccountKey;
    this.issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || '3388000000022946473';
    this.classId = `${this.issuerId}.tarjet_card_class`;
    console.log('🏗️ GoogleWalletService inicializado con Issuer ID:', this.issuerId);
  }

  // Generar un ID único que cambie cuando los datos cambien
  generateUniqueObjectId(userData, urlSitio) {
    const dataToHash = `${userData.UUID}-${userData.Nom}-${userData.AppP}-${userData.AppM}-${urlSitio}`;
    const hash = crypto.createHash('md5').update(dataToHash).digest('hex');
    return `${this.issuerId}.${hash}`;
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
      },
      hexBackgroundColor: "#4285f4",
      logo: {
        sourceUri: {
          uri: "https://tarjetshop.com/wp-content/uploads/2023/07/logo.webp"
        },
        contentDescription: {
          defaultValue: {
            language: "es",
            value: "Google Wallet"
          }
        }
      },
      cardTitle: {
        defaultValue: {
          language: "es",
          value: "Tarjet Presentación Digital"
        }
      },
      header: {
        defaultValue: {
          language: "es",
          value: "Tarjet Digital Card"
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
        console.log('ℹ️ La clase ya existe, actualizando...');
        try {
          const updateResponse = await walletobjects.genericclass.update({
            resourceId: this.classId,
            requestBody: genericClass
          });
          console.log('✅ Clase actualizada exitosamente');
          return updateResponse.data;
        } catch (updateError) {
          console.error('❌ Error actualizando clase:', updateError.response?.data || updateError.message);
          return null;
        }
      }
      console.error('❌ Error creando clase:', error.response?.data || error.message);
      throw error;
    }
  }

  // 2. Crear el objeto pass individual con versionado
  createPassObject(userData, urlSitio) {
    // Usar ID único basado en el contenido para forzar actualizaciones
    const objectId = this.generateUniqueObjectId(userData, urlSitio);
    
    console.log('🎫 Creando pass object con ID único:', objectId);
  
    return {
      id: objectId,
      classId: this.classId,
      state: 'ACTIVE',
      // Logo normal de Google
      logo: {
        sourceUri: {
          uri: "https://tarjetshop.com/wp-content/uploads/2023/07/logo.webp"
        },
        contentDescription: {
          defaultValue: {
            language: "es",
            value: "Google Wallet"
          }
        }
      },
      cardTitle: {
        defaultValue: {
          language: "es",
          value: "Tarjet Presentación Digital"
        }
      },
      header: {
        defaultValue: {
          language: "es",
          value: `${userData.Nom} ${userData.AppP} ${userData.AppM}`
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
        },
        {
          id: 'description',
          header: 'Descripción',
          body: 'Tarjeta digital creada con Tarjet - https://tarjet.site'
        },
        {
          id: 'timestamp',
          header: 'Actualizado',
          body: new Date().toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ],
      linksModuleData: {
        uris: [
          {
            uri: urlSitio,
            description: 'Ver Tarjet Digital',
            id: 'tarjet_link'
          },
          {
            uri: 'https://tarjet.site',
            description: 'Visitar Tarjet',
            id: 'tarjet_website'
          }
        ]
      },
      barcode: {
        type: 'QR_CODE',
        value: urlSitio,
        alternateText: 'Escanea para ver la tarjeta digital'
      },
      hexBackgroundColor: "#4285f4"
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
      exp: now + (60 * 60), // 1 hora de validez
      origins: ['https://tarjet.site'],
      payload: {
        genericObjects: [passObject]
      }
    };

    console.log('📝 Payload del JWT con ID único:', passObject.id);
    
    try {
      const token = jwt.sign(payload, this.serviceAccountKey.private_key, {
        algorithm: 'RS256'
      });
      
      console.log('✅ JWT generado exitosamente');
      console.log('📏 Longitud del token:', token.length);
      
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
      // Primero asegurarnos de que la clase existe
      await this.createPassClass();
      
      // Crear el objeto pass con ID único
      const passObject = this.createPassObject(userData, urlSitio);
      
      // Generar el JWT
      const jwtToken = this.generateWalletJWT(passObject);
      
      console.log('✅ JWT generado con ID único:', passObject.id);
      
      // Crear la URL final con timestamp para evitar caching
      const timestamp = Date.now();
      const finalUrl = `https://pay.google.com/gp/v/save/${jwtToken}`;
      
      console.log('🔗 URL final generada con prevención de cache');
      return finalUrl;
    } catch (error) {
      console.error('💥 Error creando URL de Google Wallet:', error);
      throw error;
    }
  }

  // 5. Método adicional: forzar actualización de pass existente
  async updateExistingPass(userData, urlSitio) {
    console.log('🔄 Forzando actualización de pass existente...');
    
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: this.serviceAccountKey,
        scopes: ['https://www.googleapis.com/auth/wallet_object.issuer']
      });

      const walletobjects = google.walletobjects({
        version: 'v1',
        auth: auth
      });

      // Primero obtener el ID antiguo (basado solo en UUID)
      const oldObjectId = `${this.issuerId}.${userData.UUID.replace(/-/g, '').toLowerCase()}`;
      
      // Intentar eliminar el pass antiguo
      try {
        await walletobjects.genericobject.delete({
          resourceId: oldObjectId
        });
        console.log('✅ Pass antiguo eliminado:', oldObjectId);
      } catch (deleteError) {
        if (deleteError.response?.status !== 404) {
          console.log('ℹ️ Pass antiguo no encontrado o ya eliminado');
        }
      }

      // Crear nuevo pass con ID único
      return await this.createSaveToWalletUrl(userData, urlSitio);
      
    } catch (error) {
      console.error('❌ Error forzando actualización:', error);
      // Fallback: crear nuevo pass normalmente
      return await this.createSaveToWalletUrl(userData, urlSitio);
    }
  }
}