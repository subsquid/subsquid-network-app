export const SQUID_DATASOURCE: { endpoint: string; fetchParams?: RequestInit } = {
  endpoint: process.env.SQUID_API_URL || `/graphql`,
  fetchParams: {
    headers: {
      'Content-type': 'application/json',
    },
  },
};
