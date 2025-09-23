// app/api/analytics/leirem-pages/route.ts
import { NextResponse } from 'next/server';
import { data } from '../../../analytics/leirem/data';

const ITEMS_PER_PAGE = 20;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    
    // Simular datos de analytics para las rutas Leiram
    // En una implementación real, esto vendría de Google Analytics
    const analyticsData = data.map(routeId => ({
      path: `/st/${routeId}`,
      views: Math.floor(Math.random() * 1000).toString(),
      users: Math.floor(Math.random() * 500).toString()
    }));

    // Ordenar por views (descendente)
    analyticsData.sort((a, b) => parseInt(b.views) - parseInt(a.views));

    // Paginación
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = analyticsData.slice(startIndex, endIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(analyticsData.length / ITEMS_PER_PAGE),
      perPage: ITEMS_PER_PAGE,
      totalItems: analyticsData.length
    };

    return NextResponse.json({
      data: paginatedData,
      pagination
    });
  } catch (error) {
    console.error('Error in leiram-pages API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}