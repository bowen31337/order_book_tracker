// src/services/binanceApi.ts
import axios from 'axios';
import { addMonths } from 'date-fns';
import { VolatilityPeriod } from '../types';

const API_URL = 'https://api.binance.com/api/v3/klines';

export const fetchHistoricalPriceData = async (symbol: string, interval: string, startTime: number, endTime: number) => {
  const endpoint = `${API_URL}?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`;
  const response = await axios.get(endpoint);
  return response.data.map((d: any) => ({
    openTime: d[0],
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
    percentageChange: ((parseFloat(d[2]) - parseFloat(d[3])) / parseFloat(d[3])) * 100, // Calculate percentage change
  }));
};

export const calculateHourlyVolatility = (data: any[]) => {
  const hourlyVolatility: { [hour: string]: number[] } = {};
  const percentageChanges: { [hour: string]: number[] } = {};

  data.forEach((candle) => {
    const date = new Date(candle.openTime);
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const volatility = Math.abs(parseFloat(candle.high) - parseFloat(candle.low));
    const percentageChange = candle.percentageChange;
    if (!hourlyVolatility[hour]) {
      hourlyVolatility[hour] = [];
      percentageChanges[hour] = [];
    }
    hourlyVolatility[hour].push(volatility);
    percentageChanges[hour].push(percentageChange);
  });

  return { hourlyVolatility, percentageChanges };
};

export const analyzeVolatility = (hourlyVolatility: { [hour: string]: number[] }, percentageChanges: { [hour: string]: number[] }) => {
  const volatilityScores: { hour: string; score: number; averagePercentageChange: number }[] = Object.keys(hourlyVolatility).map((hour) => {
    const volatilities = hourlyVolatility[hour];
    const avgVolatility = volatilities.reduce((acc, val) => acc + val, 0) / volatilities.length;
    const avgPercentageChange = percentageChanges[hour].reduce((acc, val) => acc + val, 0) / percentageChanges[hour].length;
    return { hour, score: avgVolatility, averagePercentageChange: avgPercentageChange };
  });

  volatilityScores.sort((a, b) => b.score - a.score);

  return volatilityScores.slice(0, 5); // Top 5 most volatile hours
};

export const getVolatilityData = async (symbol: string): Promise<VolatilityPeriod[]> => {
  const endTime = Date.now();
  const startTime = addMonths(new Date(endTime), -6).getTime();
  const data = await fetchHistoricalPriceData(symbol, '1h', startTime, endTime);
  const { hourlyVolatility, percentageChanges } = calculateHourlyVolatility(data);
  return analyzeVolatility(hourlyVolatility, percentageChanges);
};
