// app/analytics/leirem/page.tsx
import LeiramAnalytics from '@/components/analytics/LeiremAnalytics';
import styles from '../page.module.scss';

async function getLeiramAnalyticsData(page = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_LOCAL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/analytics/leiram-pages?page=${page}`, {
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function LeiramAnalyticsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const { data, pagination } = await getLeiramAnalyticsData(page);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Analíticas de Rutas Leirem</h1>
      <LeiramAnalytics 
        initialData={data} 
        initialPagination={pagination} 
      />
    </main>
  );
}