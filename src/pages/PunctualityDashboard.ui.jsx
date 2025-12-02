import React from 'react';
import { useFlightStats } from '../shared/hooks/useFlightStats';
import { StatsOverview } from '../widgets/ui/StatsOverview.ui';
import { DelayChart } from '../widgets/ui/DelayChart.ui';
import styles from './PunctualityDashboard.module.css';

export const PunctualityDashboard = () => {
  const { loading, error, summary, hourlyStats } = useFlightStats();
  
  const currentTime = new Date().toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Moscow'
  });
  
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <div className={styles.loadingText}>
            <div className={styles.loadingTitle}>Инициализация системы мониторинга</div>
            <div className={styles.loadingSubtitle}>Загрузка оперативных данных в реальном времени</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚡</div>
        <div className={styles.errorContent}>
          <h3 className={styles.errorTitle}>Сбой получения данных</h3>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button className={styles.primaryButton}>Повторить запрос</button>
            <button className={styles.secondaryButton}>Переключить на резервный канал</button>
          </div>
        </div>
      </div>
    );
  }

  const punctualityRate = summary.total > 0 
    ? ((summary.onTime / summary.total) * 100).toFixed(1) 
    : '0.0';
    
  const averageDelay = summary.delayed > 0 
    ? summary.averageDelay 
    : 0;

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerPanel}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.mainTitle}>Система мониторинга авиаперевозок</h1>
            <div className={styles.titleSubtext}>Оперативный контроль выполнения рейсов в реальном времени</div>
          </div>
          
          <div className={styles.systemInfo}>
            <div className={styles.timeDisplay}>
              <div className={styles.timeLabel}>Текущее время (МСК)</div>
              <div className={styles.timeValue}>{currentTime}</div>
            </div>
            <div className={styles.dateDisplay}>
              <div className={styles.dateLabel}>Дата</div>
              <div className={styles.dateValue}>{currentDate}</div>
            </div>
          </div>
        </div>
        
        <div className={styles.dataSource}>
          <span className={styles.sourceLabel}>Источник данных:</span>
          <span className={styles.sourceValue}>FlightStats API</span>
          <div className={styles.updateIndicator}>
            <span className={styles.indicatorDot}></span>
            <span className={styles.indicatorText}>Активное обновление</span>
          </div>
        </div>
      </div>

      <div className={styles.contentArea}>
        
        <div className={styles.metricsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Оперативные показатели</h2>
            <div className={styles.timeRange}>Период: последние 24 часа</div>
          </div>
          
          <StatsOverview stats={summary} />
          
          <div className={styles.additionalMetrics}>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Пунктуальность</span>
                <span className={styles.metricTrend} data-trend="up">+2.3%</span>
              </div>
              <div className={styles.metricValue}>{punctualityRate}%</div>
              <div className={styles.metricProgress}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${punctualityRate}%` }}
                ></div>
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Средняя задержка</span>
                <span className={styles.metricTrend} data-trend="down">-15 мин</span>
              </div>
              <div className={styles.metricValue}>
                {averageDelay > 0 ? `${averageDelay} мин` : '—'}
              </div>
              <div className={styles.metricDescription}>
                Улучшение на 12% к прошлому периоду
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Вероятность сбоев</span>
                <span className={styles.metricRisk} data-risk="low">Низкий</span>
              </div>
              <div className={styles.metricValue}>4.7%</div>
              <div className={styles.metricDescription}>
                Ниже порога критичности (8%)
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleGroup}>
              <h2 className={styles.sectionTitle}>Динамика выполнения рейсов по часам</h2>
              <div className={styles.chartSubtitle}>
                Распределение рейсов по статусам выполнения
              </div>
            </div>
            <div className={styles.periodControls}>
              <button className={styles.periodButton} data-active="true">24ч</button>
              <button className={styles.periodButton}>7д</button>
              <button className={styles.periodButton}>30д</button>
            </div>
          </div>
          
          <div className={styles.chartContainer}>
            <DelayChart data={hourlyStats} />
          </div>
          
          <div className={styles.chartInsights}>
            <div className={styles.insightItem}>
              <div className={styles.insightIcon}></div>
              <div className={styles.insightContent}>
                <div className={styles.insightTitle}>Пиковый час</div>
                <div className={styles.insightValue}>14:00-15:00</div>
              </div>
            </div>
            <div className={styles.insightItem}>
              <div className={styles.insightIcon}></div>
              <div className={styles.insightContent}>
                <div className={styles.insightTitle}>Наибольшая задержка</div>
                <div className={styles.insightValue}>18:00-19:00 (+47 мин)</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerPanel}>
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <div className={styles.statusLabel}>Всего отслеживаемых рейсов</div>
              <div className={styles.statusValue}>{summary.total}</div>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLabel}>Рейсов в режиме онлайн</div>
              <div className={styles.statusValue}>{summary.inAir}</div>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLabel}>Задержек в обработке</div>
              <div className={styles.statusValue}>{summary.delayed}</div>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLabel}>Коэффициент выполнения</div>
              <div className={styles.statusValue}>{((summary.onTime + summary.delayed) / (summary.total * 100+1)).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className={styles.systemStatus}>
            <div className={styles.statusIndicator}>
              <div className={styles.statusLight} data-status="active"></div>
              <span className={styles.statusText}>Система активна</span>
            </div>
            <div className={styles.lastUpdate}>
              Последнее обновление: {currentTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunctualityDashboard;