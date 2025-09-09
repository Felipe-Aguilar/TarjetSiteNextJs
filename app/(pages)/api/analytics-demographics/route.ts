// app/api/analytics-demographics/route.ts

import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 400 });
    }

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
    startDate.setDate(date.getDate() - 6); // Restamos 6 días a la fecha actual

    const formattedDateToday = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    
    // Obtener datos demográficos (edad y género)
    const response = await analyticsData.properties.runReport({
      property: 'properties/442421362',
      requestBody: {
        dimensions: [
            { name: 'region' }
        ],
        metrics: [{ name: 'activeUsers' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              value: `/st/${token}`,
              matchType: 'EXACT',
              caseSensitive: true,
            },
          },
        },
        
        orderBys: [
          {
            metric: {
              metricName: 'activeUsers'
            },
            desc: true
          }
        ],
        limit: 15, // Limitar a las 15 regiones principales
        dateRanges: [
            {
                startDate: formattedStartDate,
                endDate: formattedDateToday,
            },
        ]
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error en Analytics API (demográficos):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}