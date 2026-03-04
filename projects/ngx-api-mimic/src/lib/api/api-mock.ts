import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

/** Router endpoint function argument param map type */
export type NgxApiMimicQueryParamMap = Map<string, string | string[]>;

/** Router endpoint lookup object */
export type NgxApiMimicMethodLookupResult = {
  endpoint: NgxApiMimicEndpoint;
  instance: any;
  relativePath: `/${string}`;
  urlParams: (string | undefined)[];
  queryParamMap: NgxApiMimicQueryParamMap;
};

/** Supported HTTP method */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** Resolved endpoint regex and url params */
export type RegexCheckResult = {
  pathRegex: RegExp;
  urlParams: string[];
};

/** Resolved endpoint with HTTP method and function */
export interface NgxApiMimicEndpoint extends RegexCheckResult {
  method: HttpMethod;
  handler: Function;
}

/** Class type definition */
export type Class<T = any> = new (...args: any[]) => T;

/** Supported parameter types for injection */
export type NgxApiMimicParamType =
  | 'QUERY'
  | 'BODY'
  | 'PARAM'
  | 'HEADER'
  | 'URL_PARAM';

/** Metadata structure for parameter decorators */
export interface NgxApiMimicParamMetadata {
  index: number;
  type: NgxApiMimicParamType;
  name?: string;
  pipes?: (Class<PipeTransform> | PipeTransform)[];
}

/** Controller prototype definition including internal metadata keys */
export interface ControllerPrototype {
  basePath: string;
  endpoints: NgxApiMimicEndpoint[];
  _params_meta?: Map<string | symbol, NgxApiMimicParamMetadata[]>;
  _mapEndpoints: (instance: object) => void;
  [key: string]: any;
}

/** Controller interface definition - implement in Controller class */
export interface NgxApiMimicController<TData = any> {
  data: TData;
  [key: string]: any;
}

/** Helper type for handlers with attached metadata */
export type DecoratedHandler = Function & {
  endpoint?: NgxApiMimicEndpoint;
  _methodName?: string;
  _guards?: (Class<CanActivate> | CanActivate)[];
};

/** Context of the current execution for Guards */
export interface NgxApiMimicExecutionContext {
  getClass<T = any>(): Class<T>;
  getHandler(): Function;
  getArgs(): any[];
  getRequest(): {
    params: (string | undefined)[];
    query: NgxApiMimicQueryParamMap;
    body: any;
    headers: HttpHeaders;
    url: string;
  };
}

/** Interface that Guards must implement */
export interface CanActivate {
  canActivate(context: NgxApiMimicExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}

/** Metadata for Pipe transformation */
export interface ArgumentMetadata {
  readonly type: NgxApiMimicParamType;
  readonly metatype?: any;
  readonly data?: string;
}

/** Interface that Pipes must implement */
export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R;
}

/** Options of ngxApiMockInterceptorFactory */
export interface NgxApiMimicInterceptorOptions {
  minDelay?: number;
  maxDelay?: number;
  enableLog?: boolean;
}
