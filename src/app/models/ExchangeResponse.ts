export interface ExchangeResponse {
    success:   boolean;
    timestamp: number;
    base:      string;
    date:      string;
    rates:     { [key: string]: number };
}