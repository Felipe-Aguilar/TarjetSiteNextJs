'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AnalyticsChart.module.scss';

type DataPoint = {
  date: string;
  users: number;
};

type AnalyticsChartProps = {
  token: string;
};

const AnalyticsChart = ({ token }: AnalyticsChartProps) => {
  const [data, setData] = useState<DataPoint[]>([]);

  console.log(token)

  useEffect(() => {
  fetch(`/api/analytics?token=${encodeURIComponent(token)}`)
    .then(res => res.json())
    .then(json => {
      const rows = json.rows || [];
      const parsed = rows
        .map((row: any) => ({
          date: row.dimensionValues[0].value, // Guardamos el formato original "20240501" para ordenar
          formattedDate: formatDate(row.dimensionValues[0].value), // "20240501" → "05/01"
          users: parseInt(row.metricValues[0].value, 10),
        }))
        // Ordenamos por fecha (la propiedad date en formato YYYYMMDD permite ordenación alfabética)
        .sort((a: { date: string; }, b: { date: string; }) => a.date.localeCompare(b.date));
      
      setData(parsed);
    })
    .catch(console.error);
}, []);

  const formatDate = (raw: string) => {
    const date = new Date(
      parseInt(raw.slice(0, 4), 10), // año
      parseInt(raw.slice(4, 6), 10) - 1, // mes (0-indexed)
      parseInt(raw.slice(6, 8), 10) // día
    );
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  console.log('Data fetched:', data);

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Usuarios activos por día</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formattedDate" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
