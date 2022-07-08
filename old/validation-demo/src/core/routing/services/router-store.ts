import { Route } from '../types';

export class RoutesStore {

  routes: Route[] = [];

  add(arg: Route | Route[]) {
    const routes = Array.isArray(arg) ? arg : [arg];
    this.routes.push(...routes);
  }
}
