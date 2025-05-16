// app/api/analytics/popular-st-pages/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = 10;
    const totalLimit = 20; // Límite máximo de resultados a obtener de GA

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
    startDate.setDate(date.getDate() - 15);

    const formattedDateToday = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    
    const response = await analyticsData.properties.runReport({
      property: 'properties/442421362',
      requestBody: {
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' }
        ],
        dimensionFilter: {
          andGroup: {
            expressions: [{
              filter: {
                fieldName: 'pagePath',
                stringFilter: {
                  value: '^/st/[A-Za-z0-9]+$',
                  matchType: 'FULL_REGEXP',
                  caseSensitive: false
                }
              }
            }]
          }
        },
        dateRanges: [{
          startDate: formattedStartDate,
          endDate: formattedDateToday
        }],
        orderBys: [
          {
            metric: { metricName: 'screenPageViews' },
            desc: true
          }
        ],
        limit: totalLimit
      }
    } as any);

    const allData = response.data.rows?.map(row => ({
      path: row.dimensionValues?.[0].value,
      views: row.metricValues?.[0].value,
      users: row.metricValues?.[1].value
    })) || [];

    // Lógica de paginación
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = allData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(Math.min(allData.length, totalLimit) / perPage);

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages,
        perPage,
        totalItems: Math.min(allData.length, totalLimit)
      },
      metadata: {
        startDate: formattedStartDate,
        endDate: formattedDateToday,
        totalResults: response.data.rowCount
      }
    });
    
  } catch (error: any) {
    console.error('Error en Analytics API:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}