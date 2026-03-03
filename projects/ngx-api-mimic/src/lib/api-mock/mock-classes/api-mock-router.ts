import { HttpHeaders } from '@angular/common/http';
import {
  Class,
  ControllerPrototype,
  DecoratedHandler,
  HttpMethod,
  NgxApiMimicEndpoint,
  NgxApiMimicMethodLookupResult,
  NgxApiMimicQueryParamMap,
} from '../../api/api-mock';

/** API Mimic router - routes requests between controllers and their methods */
export class NgxApiMimicRouter {
  private controllers: Map<string, { instance: any; endpoints: NgxApiMimicEndpoint[] }> = new Map();

  /** Add Controller class to the router */
  add(cl: Class) {
    const instance = new cl();
    const proto = Object.getPrototypeOf(instance) as ControllerPrototype;
    if (typeof proto._mapEndpoints === 'function') {
      proto._mapEndpoints(instance);
    }
    this.controllers.set(proto.basePath, {
      instance: instance,
      endpoints: proto.endpoints || [],
    });
  }

  /** Add many Controller classes to the router */
  initialize(classes: Class[]) {
    classes.forEach((cls) => this.add(cls));
  }

  /** Get specific router method inside some of the Controller classes */
  getMethod(method: HttpMethod, path: string): NgxApiMimicMethodLookupResult | undefined {
    let cleanPath = path.replace(/^https?:\/\/[^\/]+/, '');
    cleanPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;

    const [pathPart, queryParamsPart] = cleanPath.split('?');
    const pathSegments = pathPart.split('/').filter((s) => s.length > 0);
    const base = pathSegments[0];

    const controllerInfo = this.controllers.get(base);
    if (!controllerInfo) return undefined;

    const relativePath = pathSegments.slice(1).join('/');

    const endpoint = controllerInfo.endpoints.find(
      (ep) => ep.method === method && ep.pathRegex.test(relativePath),
    );

    if (!endpoint) return undefined;

    let urlParams: (string | undefined)[] = [];
    const match = endpoint.pathRegex.exec(relativePath);
    if (match) {
      urlParams = match.slice(1);
    }

    let queryParamMap: NgxApiMimicQueryParamMap = new Map();
    if (queryParamsPart) {
      queryParamsPart.split('&').forEach((p) => {
        let [name, val] = p.split('=');
        if (name) {
          const decoded = decodeURIComponent(val || '');
          queryParamMap.set(name, decoded.includes(',') ? decoded.split(',') : decoded);
        }
      });
    }

    return { endpoint, relativePath: `/${relativePath}`, urlParams, queryParamMap };
  }

  /** Find and execute endpoint method */
  execMethod(method: HttpMethod, path: string, body: any, headers: HttpHeaders) {
    const lookup = this.getMethod(method, path);
    if (!lookup) return undefined;

    let cleanPath = path.replace(/^https?:\/\/[^\/]+/, '').replace(/^\//, '');
    const base = cleanPath.split('/')[0];
    const controllerInfo = this.controllers.get(base);

    if (!controllerInfo) return undefined;

    const handler = lookup.endpoint.handler as DecoratedHandler;
    const proto = Object.getPrototypeOf(controllerInfo.instance) as ControllerPrototype;

    const paramsMeta = proto['_params_meta']?.get(handler._methodName || '');
    let finalArgs: any[] = [];

    if (paramsMeta) {
      paramsMeta.forEach((meta) => {
        switch (meta.type) {
          case 'URL_PARAM':
            const pIdx = lookup.endpoint.urlParams.indexOf(meta.name!);
            finalArgs[meta.index] = lookup.urlParams[pIdx];
            break;
          case 'QUERY':
            finalArgs[meta.index] = lookup.queryParamMap.get(meta.name!);
            break;
          case 'QUERIES':
            finalArgs[meta.index] = lookup.queryParamMap;
            break;
          case 'BODY':
            finalArgs[meta.index] = body;
            break;
          case 'HEADERS':
            finalArgs[meta.index] = headers;
            break;
          case 'HEADER':
            finalArgs[meta.index] = headers.get(meta.name!);
            break;
        }
      });
    } else {
      finalArgs = [
        ...lookup.urlParams,
        ...(body !== undefined ? [body] : []),
        lookup.queryParamMap,
        headers,
      ];
    }

    return handler.apply(controllerInfo.instance, finalArgs);
  }
}

/** Creates NGX Api Mimic Router with list of Controller classes */
export const ngxApiMimicRouterFactory = (classes: Class<unknown>[]) => {
  const router = new NgxApiMimicRouter();
  router.initialize(classes);
  return router;
};
