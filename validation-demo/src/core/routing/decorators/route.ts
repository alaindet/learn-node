import { HttpMethod } from '../types';
import RouteStore from '../services/route-store';

export function Route(method: HttpMethod, path: string) {
  return function (
    target: any,
    name: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const handler = descriptor.value;
    const route = { method, path, handler };
    RouteStore.add(route);
    return descriptor;
  }
}
