// verify-images.js
import https from 'https';

function checkImage(url) {
  return new Promise((resolve) => {
    https.get(url, (response) => {
      console.log(`🖼️  ${url}: ${response.statusCode === 200 ? '✅ OK' : '❌ Error ' + response.statusCode}`);
      resolve(response.statusCode === 200);
    }).on('error', (error) => {
      console.log(`🖼️  ${url}: ❌ Error - ${error.message}`);
      resolve(false);
    });
  });
}

async function verifyTarjetImages() {
  console.log('🔍 Verificando imágenes de Tarjet...\n');
  
  const images = [
    'https://tarjet.site/images/logo.png',
    'https://tarjet.site/images/login-ilustracion.png',
    'https://tarjet.site/images/perfil-temporal.webp'
  ];

  let allOk = true;

  for (const imageUrl of images) {
    const isAccessible = await checkImage(imageUrl);
    if (!isAccessible) allOk = false;
  }

  console.log('\n' + '='.repeat(50));
  if (allOk) {
    console.log('🎉 ¡Todas las imágenes son accesibles!');
  } else {
    console.log('⚠️  Algunas imágenes no son accesibles. Revisa las URLs.');
  }
  console.log('='.repeat(50));
}

verifyTarjetImages().catch(console.error);