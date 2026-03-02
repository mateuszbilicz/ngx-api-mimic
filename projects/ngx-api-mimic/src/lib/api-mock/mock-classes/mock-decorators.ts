import { NgxApiMimicEndpoint, RegexCheckResult } from '../../api/api-mock';

function resolvePathRegex(path: string): RegexCheckResult {
  let resolvedPath = path.split('/');
  if (resolvedPath[0] === '/')
    resolvedPath.splice(0, 1);
  let urlParams: string[] = [];
  resolvedPath = resolvedPath.map(part => {
    const isParam = part.startsWith(':');
    if (isParam) {
      urlParams.push(part.slice(1));
      return '(\\w+)';
    } else return part;
  });
  return {
    pathRegex: new RegExp(
      `^${resolvedPath.join('\/')}$`,
      'm'
    ),
    urlParams
  }
}

/** HTTP GET method endpoint */
export function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[propertyKey]['endpoint'] = {
      method: 'GET',
      ...resolvePathRegex(path),
      handler: target[propertyKey]
    } as NgxApiMimicEndpoint;
  }
}

/** HTTP POST method endpoint */
export function Post(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[propertyKey]['endpoint'] = {
      method: 'POST',
      ...resolvePathRegex(path),
      handler: target[propertyKey]
    } as NgxApiMimicEndpoint;
  }
}

/** HTTP PUT method endpoint */
export function Put(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[propertyKey]['endpoint'] = {
      method: 'PUT',
      ...resolvePathRegex(path),
      handler: target[propertyKey]
    } as NgxApiMimicEndpoint;
  }
}

/** HTTP DELETE method endpoint */
export function Delete(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[propertyKey]['endpoint'] = {
      method: 'DELETE',
      ...resolvePathRegex(path),
      handler: target[propertyKey]
    } as NgxApiMimicEndpoint;
  }
}

function getAllFuncs(toCheck: any) {
  const props: any[] = [];
  let obj = toCheck;
  do {
    props.push(
      ...Object.getOwnPropertyNames(obj)
    );
  } while (
    obj = Object.getPrototypeOf(obj)
    );

  return props
    .sort()
    .filter((elem: any, index: number, arr: any[]) => {
      return elem != arr[index + 1]
        && typeof toCheck[elem] == 'function';
    });
}

/** Controller - contains set of methods */
export function Controller(basePath: string) {
  return (target: any) => {
    target.prototype['basePath'] = basePath;
    target.prototype['endpoints'] = target.prototype['endpoints'] || [];
    target.prototype['_mapEndpoints'] = (target: any) => {
      getAllFuncs(target)
        .forEach((propName: string) => {
          const prop = target[propName];
          if (prop.hasOwnProperty('endpoint')) {
            target['endpoints'].push(prop.endpoint);
          }
        });
    }
  }
}
