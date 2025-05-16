import styles from './STAnalytics.module.scss';
import Link from 'next/link';

interface AnalyticsData {
  path: string;
  views: string;
  users: string;
}

export default function STAnalytics({ data }: { data: AnalyticsData[] }) {
  // Encuentra el máximo de visitas para escalar las barras
  const maxViews = Math.max(...data.map(item => parseInt(item.views)) || 1);

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>10 Páginas /st/ más visitadas</h2>
      
      <div className={styles.chart}>
        {data.map((item, index) => {
          const profileId = item.path.replace('/st/', '');
          const profileUrl = `https://www.tarjet.site/st/${profileId}`;
          
          return (
            <div key={index} className={styles.barContainer}>
              <div className={styles.label}>
                <span className={styles.path}>{profileId}</span>
                <span className={styles.count}>{item.views} vistas</span>
              </div>
              <div 
                className={styles.bar} 
                style={{
                  width: `${(parseInt(item.views) / maxViews) * 100}%`,
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
        })}
      </div>
    </div>
  );
}