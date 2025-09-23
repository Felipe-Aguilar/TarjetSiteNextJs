// components/analytics/Leirem/UnifiedLeiremAnalytics.tsx
'use client';

import styles from './UnifiedLeiremAnalytics.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import DemographicsChart from '../DemographicsChart';
import { FaRegMap } from "react-icons/fa6";

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

interface UnifiedLeiremAnalyticsProps {
  initialData: AnalyticsData[];
  initialPagination: Pagination;
}

type AnalyticsView = 'pages' | 'demographics';

export default function UnifiedLeiremAnalytics({ 
  initialData, 
  initialPagination 
}: UnifiedLeiremAnalyticsProps) {
  const [data, setData] = useState(initialData);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<AnalyticsView>('pages');
  const [selectedToken, setSelectedToken] = useState<string>('');

  // Encuentra el máximo de visitas para escalar las barras
  const maxViews = Math.max(...data.map(item => parseInt(item.views)) || 1);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/leirem-pages?page=${page}`);
      const { data: newData, pagination: newPagination } = await res.json();
      setData(newData);
      setPagination(newPagination);
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenSelect = (path: string) => {
    const token = path.replace('/st/', '');
    setSelectedToken(token);
    setCurrentView('demographics');
  };

  return (
    <div className={styles.container}>
      {/* Selector de vista */}
      <div className={styles.viewSelector}>
        <button
          className={`${styles.viewButton} ${currentView === 'pages' ? styles.active : ''}`}
          onClick={() => setCurrentView('pages')}
        >
          📊 Vistas por Página
        </button>
        <button
          className={`${styles.viewButton} ${currentView === 'demographics' ? styles.active : ''}`}
          onClick={() => setCurrentView('demographics')}
          disabled={!selectedToken}
        >
          <FaRegMap /> Visitas por Región
        </button>
      </div>

      {currentView === 'pages' ? (
        <div className={styles.chartContainer}>
          <h2 className={styles.title}>
            Perfiles Leirem más visitados en los últimos 30 días
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
                      <div className={styles.actions}>
                        <Link 
                          href={profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.profileLink}
                        >
                          Ver Perfil
                        </Link>
                        <button 
                          onClick={() => handleTokenSelect(item.path)}
                          className={styles.demographicsButton}
                        >
                          Ver Demográfico
                        </button>
                      </div>
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
      ) : (
        <div className={styles.demographicsContainer}>
          <div className={styles.demographicsHeader}>
            <h2>Demográfico para: /st/{selectedToken}</h2>
            <button 
              onClick={() => setCurrentView('pages')}
              className={styles.backButton}
            >
              ← Volver a la lista
            </button>
          </div>
          <DemographicsChart token={selectedToken} />
        </div>
      )}
    </div>
  );
}