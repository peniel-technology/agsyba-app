export interface FlashSaleCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FlashSaleContent {
  countdown: FlashSaleCountdown;
  description: string;
  eyebrow: string;
  title: string;
}
