'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './DemographicsChart.module.scss';

type CountryDataPoint = {
  country: string;
  countryCode: string;
  users: number;
  percentage: number;
};

type CountriesChartProps = {
  token: string;
};

// Mapeo de códigos de país a nombres completos en español
const COUNTRY_NAMES: Record<string, string> = {
  'United States': 'Estados Unidos',
  'Mexico': 'México',
  'Spain': 'España',
  'Argentina': 'Argentina',
  'Colombia': 'Colombia',
  'Chile': 'Chile',
  'Peru': 'Perú',
  'Venezuela': 'Venezuela',
  'Ecuador': 'Ecuador',
  'Guatemala': 'Guatemala',
  'Cuba': 'Cuba',
  'Dominican Republic': 'República Dominicana',
  'Honduras': 'Honduras',
  'Paraguay': 'Paraguay',
  'El Salvador': 'El Salvador',
  'Costa Rica': 'Costa Rica',
  'Panama': 'Panamá',
  'Bolivia': 'Bolivia',
  'Uruguay': 'Uruguay',
  'Nicaragua': 'Nicaragua',
  'France': 'Francia',
  'Germany': 'Alemania',
  'Italy': 'Italia',
  'United Kingdom': 'Reino Unido',
  'Portugal': 'Portugal',
  'China': 'China',
  'Japan': 'Japón',
  'India': 'India',
  'Brazil': 'Brasil',
  'Russia': 'Rusia',
  'Canada': 'Canada',
  'Australia': 'Australia',
  'unknown': 'No especificado'
};

// Mapeo de nombres de países a códigos de bandera
const COUNTRY_FLAGS: Record<string, string> = {
  'United States': '🇺🇸',
  'Mexico': '🇲🇽',
  'Spain': '🇪🇸',
  'Argentina': '🇦🇷',
  'Colombia': '🇨🇴',
  'Chile': '🇨🇱',
  'Peru': '🇵🇪',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Italy': '🇮🇹',
  'United Kingdom': '🇬🇧',
  'China': '🇨🇳',
  'Japan': '🇯🇵',
  'India': '🇮🇳',
  'Brazil': '🇧🇷',
  'Russia': '🇷🇺',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'unknown': '🌐'
};

// Colores para las barras
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#48DBFB', '#1DD1A1', '#F368E0'];

const DemographicsChart = ({ token }: CountriesChartProps) => {
  const [data, setData] = useState<CountryDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching demographic data for token:', token);
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
        
        // Procesar datos de países
        const formattedData = rows.map((row: any, index: number) => {
          const countryName = row.dimensionValues[0]?.value || 'unknown';
          const users = parseInt(row.metricValues[0]?.value || '0', 10);
          
          return {
            country: COUNTRY_NAMES[countryName] || countryName,
            countryCode: countryName,
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

  const getCountryFlag = (countryCode: string) => {
    return COUNTRY_FLAGS[countryCode] || '🌐';
  };

  if (isLoading) return <div className={styles.loading}>Cargando datos por país...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (data.length === 0) return <div className={styles.empty}>No hay datos por país disponibles</div>;

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Distribución de Usuarios por País los últimos 5 días</h2>
      <p className={styles.subtitle}>Total de usuarios: {totalUsers.toLocaleString()}</p>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tick={{ fontSize: '0.75rem' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis 
              type="category" 
              dataKey="country"
              tick={{ fontSize: '0.85rem' }}
              width={95}
              tickFormatter={(value) => {
                const countryCode = data.find(d => d.country === value)?.countryCode || '';
                return `${getCountryFlag(countryCode)} ${value}`;
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} usuarios`, 'Cantidad']}
              labelFormatter={(label) => `País: ${label}`}
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
        <h3 className={styles.subtitle}>Detalles por País</h3>
        <div className={styles.tableContainer}>
          <table className={styles.demographicsTable}>
            <thead>
              <tr>
                <th>País</th>
                <th>Usuarios</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className={styles.flag}>{getCountryFlag(item.countryCode)}</span>
                    {item.country}
                  </td>
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