import { HttpHeaders } from '@angular/common/http';
import {
  Class,
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
    const proto = Object.getPrototypeOf(instance);
    if (typeof proto['_mapEndpoints'] === 'function') {
      proto['_mapEndpoints'](instance);
    }
    this.controllers.set(proto['basePath'], {
      instance: instance,
      endpoints: proto['endpoints'] || [],
    });
  }

  /** Add many Controller classes to the router */
  initialize(classes: Class[]) {
    classes.forEach((cls) => this.add(cls));
  }

  /** Get specific router method inside some of the Controller classes */
  getMethod(method: HttpMethod, path: string): NgxApiMimicMethodLookupResult | undefined {
    let normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const [pathPart, queryParamsPart] = normalizedPath.split('?');
    let [base, ...rest] = pathPart.split('/');
    const controllerInfo = this.controllers.get(base);
    if (!controllerInfo) return undefined;
    const endpoints = controllerInfo.endpoints,
      relativePath = '/' + rest.join('/'),
      endpoint = endpoints.find(
        (ep: NgxApiMimicEndpoint) => ep.method === method && ep.pathRegex.test(relativePath),
      );
    if (!endpoint) return undefined;
    let urlParams = new Array(endpoint.urlParams.length).fill(undefined) as (string | undefined)[];
    (endpoint.pathRegex.exec(relativePath) ?? [])
      .slice(1)
      .forEach((match: string, index: number) => {
        urlParams[index] = match;
      });
    let queryParamMap: NgxApiMimicQueryParamMap = new Map();
    if (queryParamsPart) {
      queryParamsPart.split('&').forEach((paramPart) => {
        let [name, data] = paramPart.split('=');
        if (!name) return;
        let parsedData: string | string[];
        const decodedData = data ? decodeURIComponent(data) : '';
        if (decodedData.includes(',')) {
          parsedData = decodedData.split(',');
        } else {
          parsedData = decodedData;
        }
        queryParamMap.set(name, parsedData);
      });
    }
    return {
      endpoint,
      relativePath,
      urlParams,
      queryParamMap,
    } as NgxApiMimicMethodLookupResult;
  }

  /** Find and execute endpoint method */
  execMethod(method: HttpMethod, path: string, body: any, headers: HttpHeaders) {
    const lookup = this.getMethod(method, path);
    if (!lookup) return undefined;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const base = normalizedPath.split('/')[0];
    const controllerInfo = this.controllers.get(base);
    if (!controllerInfo) return undefined;
    const args = [
      ...lookup.urlParams,
      ...(body !== undefined ? [body] : []),
      lookup.queryParamMap,
      headers,
    ];
    return lookup.endpoint.handler.apply(controllerInfo.instance, args);
  }
}

/** Creates NGX Api Mimic Router with list of Controller classes */
export const ngxApiMimicRouterFactory = (classes: Class<unknown>[]) => {
  const router = new NgxApiMimicRouter();
  router.initialize(classes);
  return router;
};
