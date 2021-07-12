const routesStore = new RoutesStore();
const router = Router();

for (const controller of controllers) {
  new controller(routesStore);
}

for (const route of routesStore.routes) {
  route.middleware
    ? router[route.method](route.path, ...route.middleware, route.handler)
    : router[route.method](route.path, route.handler);
}
