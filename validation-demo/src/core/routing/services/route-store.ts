import { RouteDescriptor } from '../types';

class RouteStore {

  routes: RouteDescriptor[] = [];

  add(route: RouteDescriptor): void {
    this.routes.push(route);
  }

  getAll(): RouteDescriptor[] {
    return this.routes;
  }
}

const store = new RouteStore();

export default store;
