export interface Flight {
    id: number;
    delay_category?: string;
    fact_departure?: string;
    fact_arrival?: string;
    plan_departure?: string;
  }
  
  export interface FlightStats {
    onTime: number;
    delayed: number;
    canceled: number;
    inAir: number;
  }
  
  export interface DelayByHour {
    time: string;
    onTime: number;
    delayed: number;
    canceled: number;
  }