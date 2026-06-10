import {
  createGoogleAnalyticsScript,
  getGoogleAnalyticsMeasurementId,
} from './googleAnalytics';

describe('google analytics helpers', () => {
  it('skips Google Analytics when the measurement id is missing or blank', () => {
    expect(getGoogleAnalyticsMeasurementId({})).toBeUndefined();
    expect(
      getGoogleAnalyticsMeasurementId({ GOOGLE_ANALYTICS_ID: '' })
    ).toBeUndefined();
    expect(
      getGoogleAnalyticsMeasurementId({ GOOGLE_ANALYTICS_ID: '   ' })
    ).toBeUndefined();
  });

  it('uses the trimmed build-time measurement id when provided', () => {
    expect(
      getGoogleAnalyticsMeasurementId({
        GOOGLE_ANALYTICS_ID: '  G-ABC1234567  ',
      })
    ).toBe('G-ABC1234567');
  });

  it('creates the gtag bootstrap script for the measurement id', () => {
    expect(createGoogleAnalyticsScript('G-ABC1234567')).toContain(
      "gtag('config', \"G-ABC1234567\")"
    );
  });
});
