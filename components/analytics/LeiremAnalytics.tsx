// components/LeiremAnalytics.tsx
'use client';

import styles from './LeiremAnalytics.module.scss';
import Link from 'next/link';
import { useState } from 'react';

interface AnalyticsData {
  path: string;
  views: string;
  users: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
}

export default function LeiramAnalytics({ initialData, initialPagination }: { 
  initialData: AnalyticsData[],
  initialPagination: Pagination
}) {
  const [data, setData] = useState(initialData);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  // Encuentra el máximo de visitas para escalar las barras
  const maxViews = Math.max(...data.map(item => parseInt(item.views)) || 1);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/leiram-pages?page=${page}`);
      const { data, pagination } = await res.json();
      setData(data);
      setPagination(pagination);
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>
        Rutas Leiram más visitadas en los últimos 15 días
        <span className={styles.pageInfo}>
          Página {pagination.currentPage} de {pagination.totalPages}
        </span>
      </h2>
      
      <div className={styles.chart}>
        {loading ? (
          <div className={styles.loading}>Cargando...</div>
        ) : (
          data.map((item, index) => {
            const routeId = item.path.replace('/st/', '');
            const profileUrl = `https://www.tarjet.site/st/${routeId}`;
            
            return (
              <div key={index} className={styles.barContainer}>
                <div className={styles.label}>
                  <span className={styles.path}>/st/{routeId}</span>
                  <span className={styles.count}>{item.views} vistas</span>
                </div>
                <div 
                  className={styles.bar} 
                  style={{
                    width: `${(parseInt(item.views) / maxViews * 100)}%`,
                    backgroundColor: `hsl(${index * 30}, 70%, 50%)`
                  }}
                />
                <div className={styles.footer}>
                  <span className={styles.users}>{item.users} usuarios</span>
                  <Link 
                    href={profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.profileLink}
                  >
                    Ver Perfil
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className={styles.pagination}>
        <button 
          onClick={() => fetchPage(pagination.currentPage - 1)}
          disabled={pagination.currentPage <= 1 || loading}
          className={styles.paginationButton}
        >
          Anterior
        </button>
        
        <span className={styles.pageStatus}>
          Página {pagination.currentPage} de {pagination.totalPages}
        </span>
        
        <button 
          onClick={() => fetchPage(pagination.currentPage + 1)}
          disabled={pagination.currentPage >= pagination.totalPages || loading}
          className={styles.paginationButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}