type GoogleAnalyticsEnv = {
  GOOGLE_ANALYTICS_ID?: string;
};

const getBuildEnv = (): GoogleAnalyticsEnv =>
  (
    globalThis as typeof globalThis & {
      process?: { env?: GoogleAnalyticsEnv };
    }
  ).process?.env ?? {};

export const getGoogleAnalyticsMeasurementId = (
  env: GoogleAnalyticsEnv = getBuildEnv()
): string | undefined => {
  const measurementId = env.GOOGLE_ANALYTICS_ID?.trim();

  return measurementId ? measurementId : undefined;
};

export const createGoogleAnalyticsScript = (measurementId: string): string => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)});
`;
