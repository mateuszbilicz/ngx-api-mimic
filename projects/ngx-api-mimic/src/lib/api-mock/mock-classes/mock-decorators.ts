import {
  DecoratedHandler,
  HttpMethod,
  NgxApiMimicEndpoint,
  NgxApiMimicParamMetadata,
  RegexCheckResult,
} from '../../api/api-mock';

/** Controller prototype with metadata */
interface ControllerPrototype {
  basePath: string;
  endpoints: NgxApiMimicEndpoint[];
  _mapEndpoints: (instance: object) => void;
  [key: string]: any;
}

/** Resolve path regex inside method decorator */
function resolvePathRegex(path: string): RegexCheckResult {
  let parts = path.split('/').filter((p) => p.length > 0);
  let urlParams: string[] = [];

  const resolvedParts = parts.map((part) => {
    if (part.startsWith(':')) {
      urlParams.push(part.slice(1));
      return '([^/]+)';
    }
    return part;
  });

  return {
    pathRegex: new RegExp(`^\/?${resolvedParts.join('\/')}\/?$`),
    urlParams,
  };
}

/** Internal helper for attaching parameter metadata to the controller prototype */
function addParamMetadata(
  target: object,
  propertyKey: string | symbol,
  metadata: NgxApiMimicParamMetadata,
): void {
  const proto = target as ControllerPrototype;
  if (!proto['_params_meta']) {
    proto['_params_meta'] = new Map();
  }
  const methodMetadata = proto['_params_meta'].get(propertyKey) || [];
  methodMetadata.push(metadata);
  proto['_params_meta'].set(propertyKey, methodMetadata);
}

/** Extract functions from Controller class */
function getAllFunctions(obj: object): string[] {
  const methodNames: string[] = [];
  let currentProto = obj;
  while (currentProto && currentProto !== Object.prototype) {
    Object.getOwnPropertyNames(currentProto).forEach((name) => {
      if (name !== 'constructor' && typeof (currentProto as any)[name] === 'function') {
        methodNames.push(name);
      }
    });
    currentProto = Object.getPrototypeOf(currentProto);
  }
  return [...new Set(methodNames)];
}

/** Creates decorator function */
function createEndpointDecorator(method: HttpMethod, path: string): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const handler = descriptor.value as DecoratedHandler;
    if (handler && typeof handler === 'function') {
      handler._methodName = propertyKey.toString();
      handler.endpoint = {
        method,
        ...resolvePathRegex(path),
        handler: handler,
      };
    }
  };
}

/** HTTP GET method endpoint */
export const Get = (path: string) => createEndpointDecorator('GET', path);

/** HTTP POST method endpoint */
export const Post = (path: string) => createEndpointDecorator('POST', path);

/** HTTP PUT method endpoint */
export const Put = (path: string) => createEndpointDecorator('PUT', path);

/** HTTP DELETE method endpoint */
export const Delete = (path: string) => createEndpointDecorator('DELETE', path);

/** Injects specific query parameter or the whole query map */
export function Query(name?: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    addParamMetadata(target, propertyKey!, {
      index: parameterIndex,
      type: name ? 'QUERY' : 'QUERIES',
      name,
    });
  };
}

/** Injects the request body */
export function Body(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    addParamMetadata(target, propertyKey!, {
      index: parameterIndex,
      type: 'BODY',
    });
  };
}

/** Injects specific URL path parameter */
export function UrlParam(name: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    addParamMetadata(target, propertyKey!, {
      index: parameterIndex,
      type: 'URL_PARAM',
      name,
    });
  };
}

/** Injects specific header or the whole HttpHeaders object */
export function Headers(name?: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    addParamMetadata(target, propertyKey!, {
      index: parameterIndex,
      type: name ? 'HEADER' : 'HEADERS',
      name,
    });
  };
}

/** Controller - contains set of methods */
export function Controller(basePath: string): ClassDecorator {
  return (constructor: Function) => {
    const proto = constructor.prototype as ControllerPrototype;
    proto.basePath = basePath.replace(/^\/|\/$/g, '');
    proto.endpoints = [];
    proto._mapEndpoints = function (instance: object) {
      getAllFunctions(instance).forEach((name) => {
        const method = (instance as any)[name] as DecoratedHandler;
        if (method && method.endpoint) {
          if (!proto.endpoints.some((e) => e === method.endpoint)) {
            proto.endpoints.push(method.endpoint);
          }
        }
      });
    };
  };
}
