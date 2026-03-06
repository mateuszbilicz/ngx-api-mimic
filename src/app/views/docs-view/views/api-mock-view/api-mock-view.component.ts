import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DescriptionTreeComponent } from '../../../../core/elements/description-tree/description-tree.component';
import { DocPageComponent } from '../../../../core/elements/doc-page/doc-page.component';
import { DescriptionTreeBranch } from '../../../../core/api/description-tree';

@Component({
  selector: 'app-api-mock-view',
  imports: [DescriptionTreeComponent, DocPageComponent],
  templateUrl: './api-mock-view.component.html',
  styleUrl: './api-mock-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiMockViewComponent {
  classTree: DescriptionTreeBranch = {
    title: 'Core Infrastructure Services',
    description: 'Classes, decorators and interceptor.',
    items: [
      {
        title: `ngxApiMockInterceptorFactory(
  router: NgxApiMimicRouter,
  options?: NgxApiMimicInterceptorOptions,
): HttpInterceptorFn`,
        description:
          'Creates ngxApiMockInterceptor that handles async router methods and custom exceptions.',
      },
      {
        title: 'NgxApiMimicRouter',
        description: 'Routes requests between controllers and their methods.',
        items: [
          {
            title: 'usePrefix(path: string)',
            description: "Sets the global prefix for this router (e.g. 'api/v1').",
          },
          {
            title: 'getPrefix(): string',
            description: 'Returns current router prefix.',
          },
          {
            title: 'add(cl: Class)',
            description: 'Adds controller class to the router.',
          },
          {
            title: 'initialize(classes: Class[])',
            description: 'Adds list of controller classes to the router.',
          },
          {
            title:
              'getMethod(method: HttpMethod, path: string): NgxApiMimicMethodLookupResult | undefined',
            description: 'Finds endpoint method by matched route.',
          },
          {
            title:
              'async execMethod(method: HttpMethod, path: string, body: any, headers: HttpHeaders)',
            description: `Takes HTTP request, finds endpoint method and executes it with all its params.`,
          },
        ],
      },
      {
        title: 'ngxApiMimicRouterFactory(classes: Class<unknown>[]): NgxApiMimicRouter',
        description: 'Router factory that creates router with class list.',
      },
      {
        title: 'NgxApiMimicException(status: number, message: string, errorData?: any = null)',
        description: 'API Mock Exception, extends Error.',
        items: [
          {
            title: 'status: number',
            description: 'Exception status number (response status code).',
          },
          {
            title: 'message: string',
            description: 'Exception message.',
          },
          {
            title: 'errorData?: any',
            description: 'Additional error data.',
          },
        ],
      },
    ],
  };
  decoratorsTree: DescriptionTreeBranch = {
    title: 'Decorators',
    description: 'Available decorators to let you build controllers and endpoints.',
    items: [
      {
        title: '@Controller(basePath: string)',
        description: 'Class decorator that turns class into API Mock Controller.',
        items: [
          {
            title: 'basePath: string',
            description:
              'Base path of the controller - in api calls: /<router_prefix>/<controller_base_path>/<endpoint>',
          },
        ],
      },
      {
        title: '@UseGuards(...guards: (Class<CanActivate> | CanActivate)[])',
        description: 'Adds guards to the controller.',
        items: [
          {
            title: '...guards: (Class<CanActivate> | CanActivate)[]',
            description: 'Guard classes that extend CanActivate guard class.',
          },
        ],
      },
      {
        title: '@Get(path: string)',
        description: 'HTTP GET method endpoint.',
        items: [
          {
            title: 'path: string',
            description:
              'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
          },
        ],
      },
      {
        title: '@Post(path: string)',
        description: 'HTTP POST method endpoint.',
        items: [
          {
            title: 'path: string',
            description:
              'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
          },
        ],
      },
      {
        title: '@Put(path: string)',
        description: 'HTTP PUT method endpoint.',
        items: [
          {
            title: 'path: string',
            description:
              'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
          },
        ],
      },
      {
        title: '@Delete(path: string)',
        description: 'HTTP DELETE method endpoint.',
        items: [
          {
            title: 'path: string',
            description:
              'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
          },
        ],
      },
      {
        title: '@Query(name: string, ...pipes: (Class<PipeTransform> | PipeTransform)[])',
        description: 'Injects specific query parameter.',
        items: [
          {
            title: 'name: string',
            description: 'Name of the query parameter.',
          },
          {
            title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
            description: `Adds pipes classes to the variable injector.`,
          },
        ],
      },
      {
        title: '@Body(...pipes: (Class<PipeTransform> | PipeTransform)[])',
        description: 'Injects the request body.',
        items: [
          {
            title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
            description: `Adds pipes classes to the variable injector.`,
          },
        ],
      },
      {
        title: '@UrlParam(...pipes: (Class<PipeTransform> | PipeTransform)[])',
        description: 'Injects specific URL path parameter.',
        items: [
          {
            title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
            description: `Adds pipes classes to the variable injector.`,
          },
        ],
      },
      {
        title: '@Headers(...pipes: (Class<PipeTransform> | PipeTransform)[])',
        description: 'Injects specific header.',
        items: [
          {
            title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
            description: `Adds pipes classes to the variable injector.`,
          },
        ],
      },
    ],
  };
  pipesTree: DescriptionTreeBranch = {
    title: 'Pipes',
    description: 'Pipes that modify injected variable.',
    items: [
      {
        title: 'ParseIntPipe',
        description: 'Converts string to number and validates the type.',
      },
      {
        title: 'ParseUUIDPipe',
        description: 'Converts string to string (UUID format) and validates the type.',
      },
      {
        title: 'DefaultValuePipe(defaultValue: any)',
        description: 'Converts passes variable or default value.',
      },
      {
        title: 'ParseFloatPipe',
        description: 'Converts string to number and validates the type.',
      },
      {
        title: 'ParseBoolPipe',
        description: 'Converts string | boolean to boolean and validates the type.',
      },
      {
        title: 'ParseDatePipe',
        description: 'Converts string to Date and validates the type.',
      },
      {
        title: 'ParseEnumPipe(enum: object)',
        description: 'Converts string to enum and validates the type.',
      },
      {
        title: 'ParseArrayPipe',
        description: 'Converts string to array (by "," delimiter) and validates the type.',
      },
      {
        title: 'ParseFilePipe',
        description: 'Converts string to File | Blob and validates the type.',
      },
    ],
  };
  typesAndInterfacesTree: DescriptionTreeBranch = {
    title: 'Types and interfaces',
    description:
      'All exported types and interfaces for API Mock. Remember to use interfaces and types from ngx-api-mimic in your API Mock files - except HttpHeaders - this can be imported from @angular/common/http.',
    items: [
      {
        title: 'NgxApiMimicQueryParamMap',
        description: 'Router endpoint function argument param map type.',
      },
      {
        title: 'NgxApiMimicMethodLookupResult',
        description: 'Router endpoint lookup object.',
        items: [
          {
            title: 'endpoint: NgxApiMimicEndpoint',
            description: 'Found endpoint.',
          },
          {
            title: 'instance: any',
            description: 'Controller class instance.',
          },
          {
            title: 'relativePath: `/${string}`',
            description: 'Path relative to controller path.',
          },
          {
            title: 'urlParams: (string | undefined)[]',
            description: 'Passed URL Params array.',
          },
          {
            title: 'queryParamMap: NgxApiMimicQueryParamMap',
            description: 'Passed query params map.',
          },
        ],
      },
      {
        title: 'HttpMethod',
        description: 'Supported HTTP method.',
      },
      {
        title: 'RegexCheckResult',
        description: 'Resolved endpoint regex and url params.',
        items: [
          {
            title: 'pathRegex: RegExp',
            description: 'Found regex that matches path string.',
          },
          {
            title: 'urlParams: string[]',
            description: 'Url param names required by this path.',
          },
        ],
      },
      {
        title: 'NgxApiMimicEndpoint',
        description: 'Extends RegexCheckResult. Resolved endpoint with HTTP method and function.',
        items: [
          {
            title: 'method: HttpMethod',
            description: 'HTTP method required my endpoint method.',
          },
          {
            title: 'handler: Function',
            description: 'Endpoint method from controller class.',
          },
        ],
      },
      {
        title: 'Class<T = any>',
        description: 'Class type definition.',
      },
      {
        title: 'NgxApiMimicParamType',
        description: 'Supported parameter types for injection.',
      },
      {
        title: 'NgxApiMimicParamMetadata',
        description: 'Metadata structure for parameter decorators.',
        items: [
          {
            title: 'index: number',
            description: 'Parameter index number.',
          },
          {
            title: 'type: NgxApiMimicParamType',
            description: 'Parameter type.',
          },
          {
            title: 'name?: string',
            description: 'Parameter name string.',
          },
          {
            title: 'pipes?: (Class<PipeTransform> | PipeTransform)[]',
            description: 'Parameter pipes array.',
          },
        ],
      },
      {
        title: 'ControllerPrototype',
        description: 'Controller prototype definition including internal metadata keys.',
        items: [
          {
            title: 'basePath: string',
            description: 'Controller base path.',
          },
          {
            title: 'endpoints: NgxApiMimicEndpoint[]',
            description: 'Controller endpoints array.',
          },
          {
            title: '_params_meta?: Map<string | symbol, NgxApiMimicParamMetadata[]>',
            description: 'Controller params metadata.',
          },
          {
            title: '_mapEndpoints: (instance: object) => void',
            description: 'Controller mapped endpoints.',
          },
          {
            title: '[key: string]: any',
            description: 'Additional data stored by the controller.',
          },
        ],
      },
      {
        title: 'NgxApiMimicController<TData = any>',
        description:
          'Controller interface definition (for mixed controllers) - implement in Controller class.',
        items: [
          {
            title: 'data: TData',
            description: 'Data variable inside controller class.',
          },
          {
            title: '[key: string]: any',
            description: 'User-defined controller methods and variables.',
          },
        ],
      },
      {
        title: 'DecoratedHandler',
        description: 'Extends Function. Helper type for handlers with attached metadata.',
        items: [
          {
            title: 'endpoint?: NgxApiMimicEndpoint',
            description: 'Endpoint method data.',
          },
          {
            title: '_methodName?: string',
            description: 'Endpoint method name.',
          },
          {
            title: '_guards?: (Class<CanActivate> | CanActivate)[]',
            description: 'List of guards on specific endpoint.',
          },
        ],
      },
      {
        title: 'NgxApiMimicExecutionContext',
        description: 'Context of the current execution for Guards.',
        items: [
          {
            title: 'getClass<T = any>(): Class<T>',
            description: 'Returns controller class instance.',
          },
          {
            title: 'getHandler(): Function',
            description: 'Returns endpoint handler method.',
          },
          {
            title: 'getArgs(): any[]',
            description: 'Returns arguments passed to the endpoint method.',
          },
          {
            title: 'getRequest()',
            description: 'Returns request context object.',
            items: [
              {
                title: 'params: (string | undefined)[]',
                description: 'URL parameters list.',
              },
              {
                title: 'query: NgxApiMimicQueryParamMap',
                description: 'Query params map.',
              },
              {
                title: 'body: any',
                description: 'Put / Post body.',
              },
              {
                title: 'headers: HttpHeaders',
                description: 'HTTP Headers.',
              },
              {
                title: 'url: string',
                description: 'URL path.',
              },
            ],
          },
        ],
      },
      {
        title: 'CanActivate',
        description: 'Interface that Guards must implement.',
        items: [
          {
            title:
              'canActivate(context: NgxApiMimicExecutionContext): boolean | Promise<boolean> | Observable<boolean>',
            description: 'Can activate function.',
          },
        ],
      },
      {
        title: 'ArgumentMetadata',
        description: 'Metadata for Pipe transformation.',
        items: [
          {
            title: 'type: NgxApiMimicParamType',
            description: 'Pipe type.',
          },
          {
            title: 'metatype?: any',
            description: 'Additional type.',
          },
          {
            title: 'data?: string',
            description: 'Property name.',
          },
        ],
      },
      {
        title: 'PipeTransform<T = any, R = any>',
        description: 'Interface that Pipes must implement.',
        items: [
          {
            title: 'transform(value: T, metadata: ArgumentMetadata): R',
            description: 'Pipe transform function inside pipe.',
          },
        ],
      },
      {
        title: 'NgxApiMimicInterceptorOptions',
        description: 'Options of ngxApiMockInterceptorFactory.',
        items: [
          {
            title: 'minDelay?: number',
            description: 'Minimum response delay.',
          },
          {
            title: 'maxDelay?: number',
            description: 'Maximum response delay.',
          },
          {
            title: 'enableLog?: boolean',
            description: 'Enable logs response success / error.',
          },
        ],
      },
    ],
  };
}
