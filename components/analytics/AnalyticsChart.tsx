'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AnalyticsChart.module.scss';

type DataPoint = {
  date: string;
  formattedDate: string;
  users: number;
};

type AnalyticsChartProps = {
  token: string;
};

const AnalyticsChart = ({ token }: AnalyticsChartProps) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/analytics?token=${encodeURIComponent(token)}`);
        if (!response.ok) throw new Error('Error fetching data');
        
        const json = await response.json();
        const rows = json.rows || [];
        
        const parsed = rows
          .map((row: any) => ({
            date: row.dimensionValues[0].value,
            formattedDate: formatDate(row.dimensionValues[0].value),
            users: parseInt(row.metricValues[0].value, 10),
          }))
          .sort((a: { date: string; }, b: { date: string; }) => a.date.localeCompare(b.date));
        
        setData(parsed);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const formatDate = (raw: string) => {
    const date = new Date(
      parseInt(raw.slice(0, 4), 10),
      parseInt(raw.slice(4, 6), 10) - 1,
      parseInt(raw.slice(6, 8), 10)
    );
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  if (isLoading) return <div className={styles.loading}>Cargando datos...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (data.length === 0) return <div className={styles.empty}>No hay datos disponibles</div>;

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Usuarios activos los últimos 5 días</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: '0.75rem' }}
              interval={Math.ceil(data.length / 7)} // Mostrar aproximadamente 7 etiquetas
            />
            <YAxis 
              allowDecimals={false} 
              tick={{ fontSize: '0.75rem' }}
              width={30} // Espacio fijo para etiquetas Y
            />
            <Tooltip 
              contentStyle={{
                fontSize: '0.875rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#006414" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
