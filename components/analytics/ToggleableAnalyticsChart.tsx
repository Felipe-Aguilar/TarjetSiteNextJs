'use client';

import { useState } from 'react';
import AnalyticsChart from './AnalyticsChart';
import styles from './ToggleableAnalyticsChart.module.scss';
import DemographicsChart from './DemographicsChart';

type ToggleableAnalyticsChartProps = {
  token: string;
};

const ToggleableAnalyticsChart = ({ token }: ToggleableAnalyticsChartProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.sectionContainer}>
      <div 
        className={styles.sectionHeader}
        onClick={() => setIsVisible(!isVisible)}
      >
        <h3>Estadísticas de Visitas {isVisible ? '▲' : '▼'}</h3>
      </div>
      
      {isVisible && (
        <div className={styles.sectionContent}>
          <AnalyticsChart token={token} />
          <DemographicsChart token={token} /> 
        </div>
      )}
    </div>
  );
};

export default ToggleableAnalyticsChart;