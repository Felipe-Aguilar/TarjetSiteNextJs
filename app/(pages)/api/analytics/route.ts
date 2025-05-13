// app/api/analytics/route.ts
import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    const keyFilePath = path.join(process.cwd(), 'service_account.json');

    if (!fs.existsSync(keyFilePath)) {
      return NextResponse.json({ error: 'Archivo de credenciales no encontrado' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata({
        version: 'v1beta',
        auth: await auth.getClient() as unknown as import('google-auth-library').OAuth2Client,
    });
        
    const date = new Date();
    const formattedDateToday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log(formattedDateToday)

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
                value: '/st/NTdmMWEyNDRh',
                matchType: 'EXACT',
                caseSensitive: true,
                },
            },
            },
            dateRanges: [
            {
                startDate: '2024-05-01',
                endDate: '2025-05-13',
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
