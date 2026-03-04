import { HttpHeaders } from '@angular/common/http';
import {
  Class,
  ControllerPrototype,
  DecoratedHandler,
  HttpMethod,
  NgxApiMimicEndpoint,
  NgxApiMimicExecutionContext,
  NgxApiMimicMethodLookupResult,
  NgxApiMimicParamMetadata,
  NgxApiMimicQueryParamMap,
} from '../../api/api-mock';
import { NgxApiMimicException } from './ngx-api-mimic-exception';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

/** API Mimic router - routes requests between controllers and their methods */
export class NgxApiMimicRouter {
  private controllers: Map<string, { instance: any; endpoints: NgxApiMimicEndpoint[] }> = new Map();

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

  initialize(classes: Class[]) {
    classes.forEach((cls) => this.add(cls));
  }

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

  /** Updated execMethod to support async Guards and Pipes */
  async execMethod(method: HttpMethod, path: string, body: any, headers: HttpHeaders) {
    const lookup = this.getMethod(method, path);
    if (!lookup) return undefined;

    let cleanPath = path.replace(/^https?:\/\/[^\/]+/, '').replace(/^\//, '');
    const base = cleanPath.split('/')[0];
    const controllerInfo = this.controllers.get(base);

    if (!controllerInfo) return undefined;

    const handler = lookup.endpoint.handler as DecoratedHandler;
    const instance = controllerInfo.instance;
    const proto = Object.getPrototypeOf(instance) as ControllerPrototype;

    const context: NgxApiMimicExecutionContext = {
      getClass: () => instance.constructor,
      getHandler: () => handler,
      getArgs: () => [],
      getRequest: () => ({
        body,
        headers,
        query: lookup.queryParamMap,
        params: lookup.urlParams,
        url: path,
      }),
    };

    const guards = [...(proto['_guards'] || []), ...(handler._guards || [])];

    for (const guard of guards) {
      const guardInstance = typeof guard === 'function' ? new (guard as any)() : guard;
      const canActivate = await this.resolveValue(guardInstance.canActivate(context));
      if (!canActivate) {
        throw new NgxApiMimicException(403, 'Forbidden resource');
      }
    }

    const paramsMeta = proto['_params_meta']?.get(handler._methodName || '');
    let finalArgs: any[] = [];

    if (paramsMeta) {
      for (const meta of paramsMeta) {
        let value = this.getRawValue(meta, lookup, body, headers);

        if (meta.pipes && meta.pipes.length > 0) {
          for (const pipe of meta.pipes) {
            const pipeInstance = typeof pipe === 'function' ? new (pipe as any)() : pipe;
            value = await pipeInstance.transform(value, { type: meta.type, data: meta.name });
          }
        }
        finalArgs[meta.index] = value;
      }
    } else {
      finalArgs = [
        ...lookup.urlParams,
        ...(body !== undefined ? [body] : []),
        lookup.queryParamMap,
        headers,
      ];
    }

    return handler.apply(instance, finalArgs);
  }

  /** Helper to extract raw value before pipes */
  private getRawValue(
    meta: NgxApiMimicParamMetadata,
    lookup: NgxApiMimicMethodLookupResult,
    body: any,
    headers: HttpHeaders,
  ): any {
    switch (meta.type) {
      case 'URL_PARAM':
      case 'PARAM':
        const pIdx = lookup.endpoint.urlParams.indexOf(meta.name!);
        return lookup.urlParams[pIdx];
      case 'QUERY':
        return lookup.queryParamMap.get(meta.name!);
      case 'BODY':
        return body;
      case 'HEADER':
        return headers.get(meta.name!);
      default:
        return undefined;
    }
  }

  /** Helper to resolve Boolean | Promise | Observable */
  private async resolveValue<T>(value: T | Promise<T> | Observable<T>): Promise<T> {
    if (isObservable(value)) {
      return await firstValueFrom(value);
    }
    return value;
  }
}

/** Creates NGX Api Mimic Router with list of Controller classes */
export const ngxApiMimicRouterFactory = (classes: Class<unknown>[]) => {
  const router = new NgxApiMimicRouter();
  router.initialize(classes);
  return router;
};
