import * as cors from 'cors';

const options: cors.CorsOptions = {
  origin: process.env['CORS_URL'],
};

export default options;
