// app/google-wallet-service.js
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
      },
      // Campos adicionales requeridos por Google
      reviewStatus: "UNDER_REVIEW",
      hexBackgroundColor: "#4285f4",
      logo: {
        sourceUri: {
          uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg"
        },
        contentDescription: {
          defaultValue: {
            language: "es",
            value: "Logo de Google"
          }
        }
      },
      cardTitle: {
        defaultValue: {
          language: "es",
          value: "Tarjet Digital"
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

  // 2. Crear el objeto pass individual
  createPassObject(userData, urlSitio) {
    const cleanUUID = userData.UUID.replace(/-/g, '').toLowerCase();
    const objectId = `${this.issuerId}.${cleanUUID}`;
    
    console.log('🎫 Creando pass object con ID:', objectId);
  
    return {
      id: objectId,
      classId: this.classId,
      state: 'ACTIVE',
      // Logo debe estar tanto en la clase como en el objeto según el ejemplo de Google
      logo: {
        sourceUri: {
          uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg"
        },
        contentDescription: {
          defaultValue: {
            language: "es",
            value: "Logo de Google"
          }
        }
      },
      cardTitle: {
        defaultValue: {
          language: "es",
          value: "Tarjet Digital"
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
        }
      ],
      barcode: {
        type: 'QR_CODE',
        value: urlSitio,
        alternateText: 'Escanea para ver la tarjeta'
      },
      hexBackgroundColor: "#4285f4",
      // Hero image de ejemplo de Google
      heroImage: {
        sourceUri: {
          uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.png"
        },
        contentDescription: {
          defaultValue: {
            language: "es",
            value: "Imagen principal de Tarjet"
          }
        }
      }
    };
  }

  // 3. Generar el JWT para Google Wallet (modificado según el ejemplo de Google)
  generateWalletJWT(passObject) {
    console.log('🔐 Generando JWT para:', passObject.id);
    
    const now = Math.floor(Date.now() / 1000);
    
    // Según el ejemplo de Google, debemos incluir tanto genericObjects como genericClasses
    const payload = {
      iss: this.issuerId,
      aud: 'google',
      typ: 'savetowallet',
      iat: now,
      exp: now + (60 * 60),
      origins: ['https://tarjet.site'],
      payload: {
        genericObjects: [passObject],
        genericClasses: [
          {
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
                              fieldPath: "object.textModulesData['name']"
                            }
                          ]
                        }
                      },
                      endItem: {
                        firstValue: {
                          fields: [
                            {
                              fieldPath: "object.textModulesData['company']"
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
                              fieldPath: "object.textModulesData['website']"
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              }
            },
            // Incluir la misma metadata de clase que creamos via API
            reviewStatus: "UNDER_REVIEW",
            hexBackgroundColor: "#4285f4",
            logo: {
              sourceUri: {
                uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg"
              },
              contentDescription: {
                defaultValue: {
                  language: "es",
                  value: "Logo de Google"
                }
              }
            },
            cardTitle: {
              defaultValue: {
                language: "es",
                value: "Tarjet Digital"
              }
            },
            header: {
              defaultValue: {
                language: "es",
                value: "Tarjet Digital Card"
              }
            }
          }
        ]
      }
    };

    console.log('📝 Payload del JWT:', JSON.stringify(payload, null, 2));
    
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
      
      // Crear el objeto pass
      const passObject = this.createPassObject(userData, urlSitio);
      
      // Generar el JWT
      const jwtToken = this.generateWalletJWT(passObject);
      
      console.log('✅ JWT generado:', jwtToken.substring(0, 50) + '...');
      
      // Crear la URL final
      const finalUrl = `https://pay.google.com/gp/v/save/${jwtToken}`;
      
      console.log('🔗 URL final generada');
      return finalUrl;
    } catch (error) {
      console.error('💥 Error creando URL de Google Wallet:', error);
      throw error;
    }
  }
}