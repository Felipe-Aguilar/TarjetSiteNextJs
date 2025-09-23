// app/analytics/leirem/page.tsx
import UnifiedLeiremAnalytics from '@/components/analytics/Leirem/UnifiedLeiremAnalytics';
import styles from '../page.module.scss';

async function getLeiremAnalyticsData(page = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_LOCAL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/analytics/leirem-pages?page=${page}`, {
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function LeiremAnalyticsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const { data, pagination } = await getLeiremAnalyticsData(page);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Analíticas de Rutas Leirem</h1>
      <UnifiedLeiremAnalytics 
        initialData={data} 
        initialPagination={pagination} 
      />
    </main>
  );
}