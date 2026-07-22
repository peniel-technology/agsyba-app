export const gradients = {
  hero: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.58)'] as const,
  promotionalBanner: ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)'] as const,
  saleBanner: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)'] as const,
  styleCard: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)'] as const,
} as const;

export const gradientLocations = {
  hero: [0.28, 1] as const,
  promotionalBanner: [0, 1] as const,
  saleBanner: [0, 1] as const,
  styleCard: [0, 0.35, 1] as const,
} as const;
