import { Flight, FlightStats, DelayByHour } from '../../entities/flight/flight.types';

export const calculateFlightStats = (flights: Flight[]): {
  summary: FlightStats;
  hourlyStats: DelayByHour[];
} => {
  let onTime = 0;
  let delayed = 0;
  let canceled = 0;
  let inAir = 0;
  const delayByHour: Record<string, { onTime: number; delayed: number; canceled: number }> = {};

  flights.forEach(flight => {
    const dc = flight.delay_category?.toLowerCase() || '';
    
    // Статистика по категориям
    if (dc === 'отменен' || dc === 'отменено' || dc === 'canceled') {
      canceled++;
    } else if (dc === 'нет_задержки' || dc === 'нет задержки') {
      onTime++;
    } else if (dc) {
      delayed++;
    }

    // Рейсы в воздухе
    if (flight.fact_departure && !flight.fact_arrival) {
      inAir++;
    }

    // Статистика по часам
    if (flight.plan_departure) {
      const dt = new Date(flight.plan_departure);
      const hourStr = dt.getHours().toString().padStart(2, '0') + ':00';

      if (!delayByHour[hourStr]) {
        delayByHour[hourStr] = { onTime: 0, delayed: 0, canceled: 0 };
      }
      
      if (dc === 'отменен' || dc === 'отменено' || dc === 'canceled') {
        delayByHour[hourStr].canceled++;
      } else if (dc === 'нет_задержки' || dc === 'нет задержки') {
        delayByHour[hourStr].onTime++;
      } else if (dc) {
        delayByHour[hourStr].delayed++;
      }
    }
  });

  const hourlyStats = Object.entries(delayByHour)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([time, counts]) => ({
      time,
      ...counts,
    }));

  return {
    summary: { onTime, delayed, canceled, inAir },
    hourlyStats
  };
};