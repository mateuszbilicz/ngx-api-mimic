import {
    DescriptionTreeBranch,
    DescriptionTreeIconInterface,
    DescriptionTreeIconMethod,
    DescriptionTreeIconProperty,
    DescriptionTreeIconType
} from '../../../../core/api/description-tree';

export const apiMockTypesTree: DescriptionTreeBranch = {
    title: 'Types and interfaces',
    description:
        'All exported types and interfaces for API Mock. Remember to use interfaces and types from ngx-api-mimic in your API Mock files - except HttpHeaders - this can be imported from @angular/common/http.',
    items: [
        {
            title: 'NgxApiMimicQueryParamMap',
            icon: DescriptionTreeIconType,
            description: 'Router endpoint function argument param map type.',
        },
        {
            title: 'NgxApiMimicMethodLookupResult',
            icon: DescriptionTreeIconType,
            description: 'Router endpoint lookup object.',
            items: [
                {
                    title: 'endpoint: NgxApiMimicEndpoint',
                    icon: DescriptionTreeIconProperty,
                    description: 'Found endpoint.',
                },
                {
                    title: 'instance: any',
                    icon: DescriptionTreeIconProperty,
                    description: 'Controller class instance.',
                },
                {
                    title: 'relativePath: `/${string}`',
                    icon: DescriptionTreeIconProperty,
                    description: 'Path relative to controller path.',
                },
                {
                    title: 'urlParams: (string | undefined)[]',
                    icon: DescriptionTreeIconProperty,
                    description: 'Passed URL Params array.',
                },
                {
                    title: 'queryParamMap: NgxApiMimicQueryParamMap',
                    icon: DescriptionTreeIconProperty,
                    description: 'Passed query params map.',
                },
            ],
        },
        {
            title: 'HttpMethod',
            icon: DescriptionTreeIconType,
            description: 'Supported HTTP method.',
        },
        {
            title: 'RegexCheckResult',
            icon: DescriptionTreeIconType,
            description: 'Resolved endpoint regex and url params.',
            items: [
                {
                    title: 'pathRegex: RegExp',
                    icon: DescriptionTreeIconProperty,
                    description: 'Found regex that matches path string.',
                },
                {
                    title: 'urlParams: string[]',
                    icon: DescriptionTreeIconProperty,
                    description: 'Url param names required by this path.',
                },
            ],
        },
        {
            title: 'NgxApiMimicEndpoint',
            icon: DescriptionTreeIconType,
            description: 'Extends RegexCheckResult. Resolved endpoint with HTTP method and function.',
            items: [
                {
                    title: 'method: HttpMethod',
                    icon: DescriptionTreeIconProperty,
                    description: 'HTTP method required my endpoint method.',
                },
                {
                    title: 'handler: Function',
                    icon: DescriptionTreeIconProperty,
                    description: 'Endpoint method from controller class.',
                },
            ],
        },
        {
            title: 'Class<T = any>',
            icon: DescriptionTreeIconType,
            description: 'Class type definition.',
        },
        {
            title: 'NgxApiMimicParamType',
            icon: DescriptionTreeIconType,
            description: 'Supported parameter types for injection.',
        },
        {
            title: 'NgxApiMimicParamMetadata',
            icon: DescriptionTreeIconType,
            description: 'Metadata structure for parameter decorators.',
            items: [
                {
                    title: 'index: number',
                    icon: DescriptionTreeIconProperty,
                    description: 'Parameter index number.',
                },
                {
                    title: 'type: NgxApiMimicParamType',
                    icon: DescriptionTreeIconProperty,
                    description: 'Parameter type.',
                },
                {
                    title: 'name?: string',
                    icon: DescriptionTreeIconProperty,
                    description: 'Parameter name string.',
                },
                {
                    title: 'pipes?: (Class<PipeTransform> | PipeTransform)[]',
                    icon: DescriptionTreeIconProperty,
                    description: 'Parameter pipes array.',
                },
            ],
        },
        {
            title: 'ControllerPrototype',
            icon: DescriptionTreeIconType,
            description: 'Controller prototype definition including internal metadata keys.',
            items: [
                {
                    title: 'basePath: string',
                    icon: DescriptionTreeIconProperty,
                    description: 'Controller base path.',
                },
                {
                    title: 'endpoints: NgxApiMimicEndpoint[]',
                    icon: DescriptionTreeIconProperty,
                    description: 'Controller endpoints array.',
                },
                {
                    title: '_params_meta?: Map<string | symbol, NgxApiMimicParamMetadata[]>',
                    icon: DescriptionTreeIconProperty,
                    description: 'Controller params metadata.',
                },
                {
                    title: '_mapEndpoints: (instance: object) => void',
                    icon: DescriptionTreeIconProperty,
                    description: 'Controller mapped endpoints.',
                },
                {
                    title: '[key: string]: any',
                    icon: DescriptionTreeIconProperty,
                    description: 'Additional data stored by the controller.',
                },
            ],
        },
        {
            title: 'NgxApiMimicController<TData = any>',
            icon: DescriptionTreeIconInterface,
            description:
                'Controller interface definition (for mixed controllers) - implement in Controller class.',
            items: [
                {
                    title: 'data: TData',
                    icon: DescriptionTreeIconProperty,
                    description: 'Data variable inside controller class.',
                },
                {
                    title: '[key: string]: any',
                    icon: DescriptionTreeIconProperty,
                    description: 'User-defined controller methods and variables.',
                },
            ],
        },
        {
            title: 'DecoratedHandler',
            icon: DescriptionTreeIconType,
            description: 'Extends Function. Helper type for handlers with attached metadata.',
            items: [
                {
                    title: 'endpoint?: NgxApiMimicEndpoint',
                    icon: DescriptionTreeIconProperty,
                    description: 'Endpoint method data.',
                },
                {
                    title: '_methodName?: string',
                    icon: DescriptionTreeIconProperty,
                    description: 'Endpoint method name.',
                },
                {
                    title: '_guards?: (Class<CanActivate> | CanActivate)[]',
                    icon: DescriptionTreeIconProperty,
                    description: 'List of guards on specific endpoint.',
                },
            ],
        },
        {
            title: 'NgxApiMimicExecutionContext',
            icon: DescriptionTreeIconInterface,
            description: 'Context of the current execution for Guards.',
            items: [
                {
                    title: 'getClass<T = any>(): Class<T>',
                    icon: DescriptionTreeIconMethod,
                    description: 'Returns controller class instance.',
                },
                {
                    title: 'getHandler(): Function',
                    icon: DescriptionTreeIconMethod,
                    description: 'Returns endpoint handler method.',
                },
                {
                    title: 'getArgs(): any[]',
                    icon: DescriptionTreeIconMethod,
                    description: 'Returns arguments passed to the endpoint method.',
                },
                {
                    title: 'getRequest()',
                    icon: DescriptionTreeIconMethod,
                    description: 'Returns request context object.',
                    items: [
                        {
                            title: 'params: (string | undefined)[]',
                            icon: DescriptionTreeIconProperty,
                            description: 'URL parameters list.',
                        },
                        {
                            title: 'query: NgxApiMimicQueryParamMap',
                            icon: DescriptionTreeIconProperty,
                            description: 'Query params map.',
                        },
                        {
                            title: 'body: any',
                            icon: DescriptionTreeIconProperty,
                            description: 'Put / Post body.',
                        },
                        {
                            title: 'headers: HttpHeaders',
                            icon: DescriptionTreeIconProperty,
                            description: 'HTTP Headers.',
                        },
                        {
                            title: 'url: string',
                            icon: DescriptionTreeIconProperty,
                            description: 'URL path.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'CanActivate',
            icon: DescriptionTreeIconInterface,
            description: 'Interface that Guards must implement.',
            items: [
                {
                    title:
                        'canActivate(context: NgxApiMimicExecutionContext): boolean | Promise<boolean> | Observable<boolean>',
                    icon: DescriptionTreeIconMethod,
                    description: 'Can activate function.',
                },
            ],
        },
        {
            title: 'ArgumentMetadata',
            icon: DescriptionTreeIconInterface,
            description: 'Metadata for Pipe transformation.',
            items: [
                {
                    title: 'type: NgxApiMimicParamType',
                    icon: DescriptionTreeIconProperty,
                    description: 'Pipe type.',
                },
                {
                    title: 'metatype?: any',
                    icon: DescriptionTreeIconProperty,
                    description: 'Additional type.',
                },
                {
                    title: 'data?: string',
                    icon: DescriptionTreeIconProperty,
                    description: 'Property name.',
                },
            ],
        },
        {
            title: 'PipeTransform<T = any, R = any>',
            icon: DescriptionTreeIconInterface,
            description: 'Interface that Pipes must implement.',
            items: [
                {
                    title: 'transform(value: T, metadata: ArgumentMetadata): R',
                    icon: DescriptionTreeIconMethod,
                    description: 'Pipe transform function inside pipe.',
                },
            ],
        },
        {
            title: 'NgxApiMimicInterceptorOptions',
            icon: DescriptionTreeIconInterface,
            description: 'Options of ngxApiMockInterceptorFactory.',
            items: [
                {
                    title: 'minDelay?: number',
                    icon: DescriptionTreeIconProperty,
                    description: 'Minimum response delay.',
                },
                {
                    title: 'maxDelay?: number',
                    icon: DescriptionTreeIconProperty,
                    description: 'Maximum response delay.',
                },
                {
                    title: 'enableLog?: boolean',
                    icon: DescriptionTreeIconProperty,
                    description: 'Enable logs response success / error.',
                },
            ],
        },
    ],
};
