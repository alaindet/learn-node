import { Route } from '@app/core/routing';

export class Controller {

  prefix = '/';

  routes: Route[] = [];

  exportRoutes(): Route[] {
    return this.routes.map(route => {
      const method = route.method;
      const pre = this.prefix;
      const _path = route.path;
      const path = pre + (_path[0] === '/' ? _path : `/${_path}`);
      const handler = route.handler.bind(this);
      return { method, path, handler };
    });
  }
}
