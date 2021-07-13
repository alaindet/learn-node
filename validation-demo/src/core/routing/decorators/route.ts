import { HttpMethod } from '../types';
import { RegisterRoute } from './register-route';

export const Route = {
  Get: (path: string) => RegisterRoute(HttpMethod.Get, path),
  Post: (path: string) => RegisterRoute(HttpMethod.Post, path),
  Put: (path: string) => RegisterRoute(HttpMethod.Put, path),
  Patch: (path: string) => RegisterRoute(HttpMethod.Patch, path),
  Delete: (path: string) => RegisterRoute(HttpMethod.Delete, path),
};
