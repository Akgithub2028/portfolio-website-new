// Competition results and implementation details from the owner's CV.
export default {
  id: 'wunder-rnn-2025',
  name: 'Wunder RNN Challenge',
  title: 'HFT Market State Forecasting Challenge',
  organiser: 'Wunder Fund',
  period: 'Sep – Nov 2025',
  rank: 9,
  competitors: '5,000+',
  finalScore: '0.3920',
  publicScore: '0.3880',
  sequenceLength: '1,000',
  cv: '/cv/CV_Aayaann_Kausar.pdf',
  platform: 'https://wundernn.io/',
  approach: [
    {
      title: 'Model temporal dependencies.',
      text: 'Pretrained a 4-layer, 8-head Transformer with masked autoencoders and temporal positional encodings for multivariate market-state forecasting.',
    },
    {
      title: 'Normalise the features.',
      text: 'Applied median–IQR scaling to the market features before sequence modelling.',
    },
    {
      title: 'Optimise streaming inference.',
      text: 'Optimised streaming inference for a single CPU core using torch.compile, Numba kernels, and preallocated state memory buffers.',
    },
  ],
};
