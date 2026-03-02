import { NgxApiMimicEndpoint, HttpMethod } from './mock-decorators';
import {HttpHeaders} from "@angular/common/http";

export type NgxApiMimicQueryParamMap = Map<string, string | string[]>;

type MethodLookupResult = {
  endpoint: NgxApiMimicEndpoint;
  relativePath: `/${string}`;
  urlParams: (string | undefined)[];
  queryParamMap: NgxApiMimicQueryParamMap;
};

export class NgxApiMimicRouter {
  private classes: Map<string, NgxApiMimicEndpoint[]> = new Map();

  add(cl: any) {
    const cls = new cl(),
      proto = Object.getPrototypeOf(cls);
    proto['_mapEndpoints'](cls);
    this.classes.set(proto['basePath'], proto['endpoints']);
  }

  initialize(classes: any[]) {
    classes.forEach((cls) => this.add(cls));
  }

  getMethod(method: HttpMethod, path: string): MethodLookupResult | undefined {
    if (path.startsWith('/')) path = path.slice(1);
    const [pathPart, queryParamsPart] = path.split('?');
    let [base, ...rest] = pathPart.split('/');
    if (!this.classes.has(base)) return undefined;
    const endpoints = this.classes.get(base)!,
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
        let [name, data] = paramPart.split('='),
          parsedData: string | string[];
        if (data.includes(',')) {
          parsedData = data.split(',').map(decodeURIComponent);
        } else {
          parsedData = decodeURIComponent(data);
        }
        queryParamMap.set(name, parsedData);
      });
    }
    return {
      endpoint,
      relativePath,
      urlParams,
      queryParamMap,
    } as MethodLookupResult;
  }

  execMethod(method: HttpMethod, path: string, body: any, headers: HttpHeaders) {
    const fn = this.getMethod(method, path);
    if (!fn) return undefined;
    return fn.endpoint.handler(...fn.urlParams, ...(body ? [body] : []), fn.queryParamMap, headers);
  }
}
