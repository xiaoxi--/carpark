import { sysParameter } from '@/config';
import _ from 'lodash';
import index from './index';
import { carparks_api } from './carparks_api/index';
import { favorites_api } from './favorites_api/index';
import { user_api } from './user_api/index';

function open_route_register(app: any, ...routers: any[]) {
  _.each(routers, (router) => {
    app.use(`/api/${sysParameter.version}`, router);
  });
}
function auth_route_register(app: any, ...routers: any[]) {
  _.each(routers, (router) => {
    app.use(`/api/${sysParameter.version}/auth`, router);
  });
}

// All the APIs need to register here in order to be accessed
function setRoutes(app: any): void {
  open_route_register(app, [index]);
  let auth_routes = [carparks_api, user_api, favorites_api];
  auth_route_register(app, auth_routes);
}

export default setRoutes;
