import isEmpty from 'lodash-es/isEmpty';
import pickBy from 'lodash-es/pickBy';

export interface GetawayMetadata {
  name: string;
  email?: string;
  description?: string;
  website?: string;
  endpointUrl?: string;
}

export function encodeGatewayMetadata(req: GetawayMetadata) {
  const md = pickBy(
    {
      name: req.name,
      website: req.website,
      description: req.description,
      email: req.email,
      endpointUrl: req.endpointUrl,
    },
    Boolean,
  );

  return !isEmpty(md) ? JSON.stringify(md) : '';
}

export function decodeGatewayMetadata(req: string) {
  return JSON.parse(req);
}
