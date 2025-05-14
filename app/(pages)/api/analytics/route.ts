// app/api/analytics/route.ts
import { google } from 'googleapis';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 400 });
    }

    // const keyFilePath = path.join(process.cwd(), 'tarjetsite-414216-19a4d1d9ccc2.json');

    // if (!fs.existsSync(keyFilePath)) {
    //   return NextResponse.json({ error: 'Archivo de credenciales no encontrado' }, { status: 500 });
    // }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL        
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata({
        version: 'v1beta',
        auth: await auth.getClient() as unknown as import('google-auth-library').OAuth2Client,
    });
        
    const date = new Date();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - 15); // Restamos 8 días a la fecha actual

    const formattedDateToday = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    
    
     const response = await analyticsData.properties.runReport({
        property: 'properties/442421362',
        requestBody: {
            dimensions: [
            { name: 'date' },         
            { name: 'pagePath' }
            ],
            metrics: [{ name: 'activeUsers' }],
            dimensionFilter: {
            filter: {
                fieldName: 'pagePath',
                stringFilter: {
                value: `/st/${token}`, // Usamos el token dinámico
                matchType: 'EXACT',
                caseSensitive: true,
                },
            },
            },
            dateRanges: [
            {
                startDate: formattedStartDate,
                endDate: formattedDateToday,
            },
            ],
        },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error en Analytics API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}