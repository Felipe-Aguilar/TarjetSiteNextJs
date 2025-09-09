'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './DemographicsChart.module.scss';

type RegionDataPoint = {
  region: string;
  users: number;
  percentage: number;
};

type DemographicsChartProps = {
  token: string;
};

// Mapeo de regiones/estados de México (inglés a español)
const MEXICO_REGION_NAMES: Record<string, string> = {
  'Aguascalientes': 'Aguascalientes',
  'Baja California': 'Baja California',
  'Baja California Sur': 'Baja California Sur',
  'Campeche': 'Campeche',
  'Chiapas': 'Chiapas',
  'Chihuahua': 'Chihuahua',
  'Coahuila': 'Coahuila',
  'Colima': 'Colima',
  'Mexico City': 'Ciudad de México',
  'Durango': 'Durango',
  'Guanajuato': 'Guanajuato',
  'Guerrero': 'Guerrero',
  'Hidalgo': 'Hidalgo',
  'Jalisco': 'Jalisco',
  'State of Mexico': 'Estado de México',
  'Michoacán': 'Michoacán',
  'Morelos': 'Morelos',
  'Nayarit': 'Nayarit',
  'Nuevo León': 'Nuevo León',
  'Oaxaca': 'Oaxaca',
  'Puebla': 'Puebla',
  'Querétaro': 'Querétaro',
  'Quintana Roo': 'Quintana Roo',
  'San Luis Potosí': 'San Luis Potosí',
  'Sinaloa': 'Sinaloa',
  'Sonora': 'Sonora',
  'Tabasco': 'Tabasco',
  'Tamaulipas': 'Tamaulipas',
  'Tlaxcala': 'Tlaxcala',
  'Veracruz': 'Veracruz',
  'Yucatán': 'Yucatán',
  'Zacatecas': 'Zacatecas',
  'unknown': 'No especificado'
};

// Colores para las barras
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#48DBFB', '#1DD1A1', '#F368E0'];

const DemographicsChart = ({ token }: DemographicsChartProps) => {
  const [data, setData] = useState<RegionDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching region data for token:', token);
        const response = await fetch(`/api/analytics-demographics?token=${encodeURIComponent(token)}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error response:', errorText);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const json = await response.json();
        console.log('API Response:', json);
        
        const rows = json.rows || [];
        console.log('Rows:', rows);
        
        // Calcular el total de usuarios
        const total = rows.reduce((sum: number, row: any) => {
          const users = parseInt(row.metricValues[0]?.value || '0', 10);
          return sum + users;
        }, 0);
        
        setTotalUsers(total);
        console.log('Total users:', total);
        
        // Procesar datos de regiones
        const formattedData = rows.map((row: any, index: number) => {
          const regionName = row.dimensionValues[0]?.value || 'unknown';
          const users = parseInt(row.metricValues[0]?.value || '0', 10);
          
          return {
            region: MEXICO_REGION_NAMES[regionName] || regionName,
            users,
            percentage: total > 0 ? (users / total) * 100 : 0
          };
        });
        
        console.log('Formatted data:', formattedData);
        setData(formattedData);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) return <div className={styles.loading}>Cargando datos por región...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (data.length === 0) return <div className={styles.empty}>No hay datos por región disponibles</div>;

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Distribución de Usuarios por Región</h2>
      <p className={styles.subtitle}>Total de usuarios: {totalUsers.toLocaleString()}</p>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tick={{ fontSize: '0.75rem' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis 
              type="category" 
              dataKey="region"
              tick={{ fontSize: '0.85rem' }}
              width={140}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} usuarios`, 'Cantidad']}
              labelFormatter={(label) => `Región: ${label}`}
              contentStyle={{
                fontSize: '0.875rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
            <Bar 
              dataKey="users" 
              name="Usuarios"
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de datos detallados */}
      <div className={styles.tableSection}>
        <h3 className={styles.subtitle}>Detalles por Región</h3>
        <div className={styles.tableContainer}>
          <table className={styles.demographicsTable}>
            <thead>
              <tr>
                <th>Región</th>
                <th>Usuarios</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.region}</td>
                  <td>{item.users.toLocaleString()}</td>
                  <td>{item.percentage.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemographicsChart;