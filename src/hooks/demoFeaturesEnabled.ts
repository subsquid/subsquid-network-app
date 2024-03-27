import process from 'process';

export function demoFeaturesEnabled() {
  return (
    process.env.ENABLE_DEMO_FEATURES === 'true' || localStorage.getItem('demo-features') === 'true'
  );
}
