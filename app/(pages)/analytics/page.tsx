// app/analytics/page.tsx
import STAnalytics from '@/components/analytics/STAnalytics';
import styles from './page.module.scss';

async function getAnalyticsData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/analytics/popular-st-pages`, {
    cache: 'no-store' // o revalidate: 3600 si prefieres ISR
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}


export default async function AnalyticsPage() {
  const { data } = await getAnalyticsData();

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Analíticas de Usuarios</h1>
      <STAnalytics data={data} />
    </main>
  );
}