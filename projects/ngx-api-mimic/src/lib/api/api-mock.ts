/** Router endpoint function argument param map type */
export type NgxApiMimicQueryParamMap = Map<string, string | string[]>;

/** Router endpoint lookup object */
export type NgxApiMimicMethodLookupResult = {
  endpoint: NgxApiMimicEndpoint;
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
  | 'QUERIES'
  | 'BODY'
  | 'PARAM'
  | 'HEADERS'
  | 'HEADER'
  | 'URL_PARAM';

/** Metadata structure for parameter decorators */
export interface NgxApiMimicParamMetadata {
  index: number;
  type: NgxApiMimicParamType;
  name?: string;
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
};
