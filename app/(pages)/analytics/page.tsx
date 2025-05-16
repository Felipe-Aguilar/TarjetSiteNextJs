// app/analytics/page.tsx
import STAnalytics from '@/components/analytics/STAnalytics';
import styles from './page.module.scss';

  async function getAnalyticsData(page = 1) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_LOCAL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/analytics/popular-st-pages?page=${page}`, {
      cache: 'no-store' // o revalidate: 3600 si prefieres ISR
    });

    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  }

  export default async function AnalyticsPage({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    // Obtener el número de página de los query params (default a 1)
    const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
    const { data, pagination } = await getAnalyticsData(page);

    return (
      <main className={styles.container}>
        <h1 className={styles.header}>Analíticas de Usuarios</h1>
        <STAnalytics 
          initialData={data} 
          initialPagination={pagination} 
        />
      </main>
    );
  }