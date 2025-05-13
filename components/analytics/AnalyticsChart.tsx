'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AnalyticsChart.module.scss';

type DataPoint = {
  date: string;
  users: number;
};

const AnalyticsChart = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => {
        const rows = json.rows || [];
        const parsed = rows.map((row: any) => ({
          date: formatDate(row.dimensionValues[0].value), // "20240501" → "May 1"
          users: parseInt(row.metricValues[0].value, 10),
        }));
        setData(parsed);
      })
      .catch(console.error);
  }, []);

  const formatDate = (raw: string) => {
    const year = raw.slice(0, 4);
    const month = raw.slice(4, 6);
    const day = raw.slice(6, 8);
    return `${month}/${day}`;
  };

  console.log('Data fetched:', data);

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Usuarios activos por día</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
