import { HttpMethod, NgxApiMimicEndpoint, RegexCheckResult } from '../../api/api-mock';

/** Helper type for creating function decorators */
type DecoratedHandler = Function & { endpoint?: NgxApiMimicEndpoint };

/** Controller prototype with metadata */
interface ControllerPrototype {
  basePath: string;
  endpoints: NgxApiMimicEndpoint[];
  _mapEndpoints: (instance: object) => void;
  [key: string]: any;
}

/** Resolve path regex inside method decorator */
function resolvePathRegex(path: string): RegexCheckResult {
  let resolvedPath = path.split('/');
  if (resolvedPath[0] === '/') resolvedPath.splice(0, 1);
  let urlParams: string[] = [];
  resolvedPath = resolvedPath.map((part) => {
    const isParam = part.startsWith(':');
    if (isParam) {
      urlParams.push(part.slice(1));
      return '(\\w+)';
    } else return part;
  });
  return {
    pathRegex: new RegExp(`^${resolvedPath.join('\/')}$`, 'm'),
    urlParams,
  };
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

/** Extract functions from Controller class */
function getAllFunctions(obj: object): string[] {
  const methodNames: string[] = [];
  let currentProto = obj;
  while (currentProto && currentProto !== Object.prototype) {
    const props = Object.getOwnPropertyNames(currentProto);
    props.forEach((name) => {
      if (name !== 'constructor' && typeof (currentProto as any)[name] === 'function') {
        methodNames.push(name);
      }
    });
    currentProto = Object.getPrototypeOf(currentProto);
  }
  return [...new Set(methodNames)];
}

/** Controller - contains set of methods */
export function Controller(basePath: string): ClassDecorator {
  return (constructor: Function) => {
    const proto = constructor.prototype as ControllerPrototype;
    proto.basePath = basePath;
    proto.endpoints = [];
    proto._mapEndpoints = function (instance: object) {
      const allMethodNames = getAllFunctions(instance);
      allMethodNames.forEach((name) => {
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
