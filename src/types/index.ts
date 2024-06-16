// src/types/index.ts
export interface Order {
    price: string;
    quantity: string;
  }
  
  export interface OrderBook {
    asks: Order[];
    bids: Order[];
  }
  
  export interface VolatilityPeriod {
    hour: string;
    score: number;
    averagePercentageChange: number;
  }
  