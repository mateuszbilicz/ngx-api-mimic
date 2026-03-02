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
