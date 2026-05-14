export const featureFlags = {
  enableMFA: true,
  enableNotifications: true,
  enableForecasting: false,
  enableAdvancedReports: false,
  enableDarkMode: true,
} as const

export type FeatureFlag = keyof typeof featureFlags

export default featureFlags
