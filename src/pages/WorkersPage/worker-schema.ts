import * as yup from 'yup';

export const editWorkerSchema = yup.object({
  name: yup.string().label('Name').max(255).trim().required('Worker name is required'),
  description: yup.string().label('Description').max(2000).trim(),
  email: yup.string().label('Email address').trim(),
  website: yup.string().label('Website').trim(),
});

export const addWorkerSchema = editWorkerSchema.shape({
  peerId: yup
    .string()
    .matches(/^[a-z1-9]+$/i, 'Peer ID must contains only base 58 symbols')
    .max(52)
    .min(52)
    .label('Peer ID')
    .trim()
    .required('Peer ID is required'),
  source: yup.string().label('Source address').trim().required('Source address is required'),
});
