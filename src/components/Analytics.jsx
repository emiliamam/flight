import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Analytics.module.css';

const Analytics = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [explanationOpen, setExplanationOpen] = useState(false);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/delay-rules/top');
        setRules(response.data);
      } catch (err) {
        setError('Ошибка при получении данных. Проверьте подключение к серверу.');
        console.error('Error fetching rules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  const openRuleDetails = (rule) => {
    setSelectedRule(rule);
  };

  const closeRuleDetails = () => {
    setSelectedRule(null);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Загрузка аналитики задержек...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Ошибка загрузки данных</h3>
        <p>{error}</p>
        <button 
          className={styles.retryBtn}
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  const getConfidenceClass = (confidence) => {
    if (confidence > 0.8) return styles.high;
    if (confidence > 0.6) return styles.medium;
    return styles.low;
  };

  const getLiftClass = (lift) => {
    if (lift > 2) return styles.excellent;
    if (lift > 1.5) return styles.good;
    return styles.average;
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence > 0.8) return 'Высокая';
    if (confidence > 0.6) return 'Средняя';
    return 'Низкая';
  };

  const getLiftLabel = (lift) => {
    if (lift > 2) return 'Отлично';
    if (lift > 1.5) return 'Хорошо';
    return 'Средне';
  };

  return (
    <div className={styles.container}>
      {/* Шапка страницы */}
      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>
            Аналитика задержек рейсов
          </h1>
          <p className={styles.pageSubtitle}>
            На основе анализа данных выявлены скрытые закономерности, которые влияют на пунктуальность авиарейсов
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            className={styles.helpBtn}
            onClick={() => setExplanationOpen(!explanationOpen)}
          >
            Как читать таблицу?
          </button>
        </div>
      </header>

      {explanationOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Как понимать данные в таблице</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => setExplanationOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.explanationBlock}>
                <h4>Условие задержки</h4>
                <p>Правило вида "Если [условия], то [тип задержки]". Показывает при каких обстоятельствах чаще всего происходят задержки.</p>
              </div>
              
              <div className={styles.explanationBlock}>
                <h4>Поддержка (Support)</h4>
                <p>Частота встречаемости данного правила во всех рейсах. Чем выше значение, тем чаще встречается такое сочетание условий.</p>
                <div className={styles.example}>Пример: 0.05 = 5% всех рейсов</div>
              </div>
              
              <div className={styles.tips}>
                <h4>Советы по использованию:</h4>
                <ul>
                  <li>Смотрите на правила с высокой достоверностью (&gt; 0.8)</li>
                  <li>Правила с высоким подъемом (&gt; 2) наиболее полезны</li>
                  <li>Учитывайте поддержку - правила с низкой поддержкой могут быть редкими случаями</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Основная таблица */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            Топ правил о задержках рейсов
          </h2>
          <div className={styles.tableStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Всего правил:</span>
              <span className={styles.statValue}>{rules.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Средняя достоверность:</span>
              <span className={styles.statValue}>
                {(rules.reduce((sum, rule) => sum + rule.confidence, 0) / rules.length).toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.rulesTable}>
            <thead>
              <tr>
                <th className={styles.tableTh}>Условие задержки</th>
                <th className={styles.tableTh}>Поддержка</th>
                <th className={styles.tableTh}>Достоверность</th>
                <th className={styles.tableTh}>Подъем</th>
                <th className={styles.tableTh}>Детали</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <tr 
                  key={index}
                  className={`${styles.tableRow} ${index % 2 === 0 ? styles.even : styles.odd}`}
                  onClick={() => openRuleDetails(rule)}
                >
                  <td className={styles.ruleCondition}>
                    <div className={styles.ruleText}>
                      {rule.rule}
                    </div>
                  </td>
                  <td className={styles.ruleSupport}>
                    <div>
                      {rule.support.toFixed(3)}
                      <div className={styles.metricBar}>
                        <div 
                          className={styles.barFill}
                          style={{ width: `${Math.min(rule.support * 200, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.ruleConfidence}>
                    <div>
                      {rule.confidence.toFixed(3)}
                      <div className={`${styles.badge} ${styles[getConfidenceClass(rule.confidence)]}`}>
                        {getConfidenceLabel(rule.confidence)}
                      </div>
                    </div>
                  </td>
                  <td className={styles.ruleLift}>
                    <div>
                      {rule.lift.toFixed(2)}
                      <div className={`${styles.badge} ${styles[getLiftClass(rule.lift)]}`}>
                        {getLiftLabel(rule.lift)}
                      </div>
                    </div>
                  </td>
                  <td className={styles.ruleActions}>
                    <button 
                      className={styles.detailsBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        openRuleDetails(rule);
                      }}
                    >
                      Подробнее
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Попап с деталями правила */}
      {selectedRule && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.ruleDetails}`}>
            <div className={styles.modalHeader}>
              <h3>Детали правила</h3>
              <button className={styles.closeBtn} onClick={closeRuleDetails}>×</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.ruleFullText}>
                <h4>Полное правило:</h4>
                <p className={styles.ruleTextDetailed}>{selectedRule.rule}</p>
              </div>
              
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricInfo}>
                    <h5>Поддержка</h5>
                    <p className={styles.metricValueLarge}>{selectedRule.support.toFixed(3)}</p>
                    <p className={styles.metricDescription}>
                      Это правило встречается в <strong>{(selectedRule.support * 100).toFixed(1)}%</strong> всех рейсов
                    </p>
                  </div>
                </div>
                
                <div className={styles.metricCard}>
                  <div className={styles.metricInfo}>
                    <h5>Достоверность</h5>
                    <p className={styles.metricValueLarge}>{selectedRule.confidence.toFixed(3)}</p>
                    <p className={styles.metricDescription}>
                      Вероятность задержки при этих условиях: <strong>{(selectedRule.confidence * 100).toFixed(1)}%</strong>
                    </p>
                  </div>
                </div>
                
                <div className={styles.metricCard}>
                  <div className={styles.metricInfo}>
                    <h5>Подъем</h5>
                    <p className={styles.metricValueLarge}>{selectedRule.lift.toFixed(2)}</p>
                    <p className={styles.metricDescription}>
                      Правило в <strong>{selectedRule.lift.toFixed(1)}</strong> раза лучше случайного предсказания
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.closeDetailsBtn} onClick={closeRuleDetails}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Статистика внизу */}
      <div className={styles.summarySection}>
        <h3 className={styles.summaryTitle}>Статистика по правилам</h3>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryContent}>
              <h4>Средняя поддержка</h4>
              <p className={styles.summaryValue}>
                {(rules.reduce((sum, rule) => sum + rule.support, 0) / rules.length).toFixed(3)}
              </p>
            </div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryContent}>
              <h4>Максимальная достоверность</h4>
              <p className={styles.summaryValue}>
                {Math.max(...rules.map(rule => rule.confidence)).toFixed(3)}
              </p>
            </div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryContent}>
              <h4>Лучший подъем</h4>
              <p className={styles.summaryValue}>
                {Math.max(...rules.map(rule => rule.lift)).toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryContent}>
              <h4>Всего правил</h4>
              <p className={styles.summaryValue}>{rules.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;