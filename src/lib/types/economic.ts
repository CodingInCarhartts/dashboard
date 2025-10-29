export interface EconomicIndicator {
  id: string;
  name: string;
  series?: string; // Make series optional
  value: number;
  date: string;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  frequency: string;
  unit: string;
}
