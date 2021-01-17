import { CorsOptions } from 'cors';

const options: CorsOptions = {
  origin: process.env['APP_CORS_URL'],
};

export { options };
