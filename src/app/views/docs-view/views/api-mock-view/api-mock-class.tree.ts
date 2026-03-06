import {
    DescriptionTreeBranch,
    DescriptionTreeIconClass,
    DescriptionTreeIconMethod,
    DescriptionTreeIconProperty
} from '../../../../core/api/description-tree';

export const apiMockClassTree: DescriptionTreeBranch = {
    title: 'Core Infrastructure Services',
    description: 'Classes, decorators and interceptor.',
    items: [
        {
            title: 'ngxApiMockInterceptorFactory(router: NgxApiMimicRouter, options?: NgxApiMimicInterceptorOptions): HttpInterceptorFn',
            icon: DescriptionTreeIconMethod,
            description:
                'Creates ngxApiMockInterceptor that handles async router methods and custom exceptions.',
        },
        {
            title: 'NgxApiMimicRouter',
            icon: DescriptionTreeIconClass,
            description: 'Routes requests between controllers and their methods.',
            items: [
                {
                    title: 'usePrefix(path: string)',
                    icon: DescriptionTreeIconMethod,
                    description: "Sets the global prefix for this router (e.g. 'api/v1').",
                },
                {
                    title: 'getPrefix(): string',
                    icon: DescriptionTreeIconMethod,
                    description: 'Returns current router prefix.',
                },
                {
                    title: 'add(cl: Class)',
                    icon: DescriptionTreeIconMethod,
                    description: 'Adds controller class to the router.',
                },
                {
                    title: 'initialize(classes: Class[])',
                    icon: DescriptionTreeIconMethod,
                    description: 'Adds list of controller classes to the router.',
                },
                {
                    title:
                        'getMethod(method: HttpMethod, path: string): NgxApiMimicMethodLookupResult | undefined',
                    icon: DescriptionTreeIconMethod,
                    description: 'Finds endpoint method by matched route.',
                },
                {
                    title:
                        'async execMethod(method: HttpMethod, path: string, body: any, headers: HttpHeaders)',
                    icon: DescriptionTreeIconMethod,
                    description: `Takes HTTP request, finds endpoint method and executes it with all its params.`,
                },
            ],
        },
        {
            title: 'ngxApiMimicRouterFactory(classes: Class<unknown>[]): NgxApiMimicRouter',
            icon: DescriptionTreeIconMethod,
            description: 'Router factory that creates router with class list.',
        },
        {
            title: 'NgxApiMimicException(status: number, message: string, errorData?: any = null)',
            icon: DescriptionTreeIconClass,
            description: 'API Mock Exception, extends Error.',
            items: [
                {
                    title: 'status: number',
                    icon: DescriptionTreeIconProperty,
                    description: 'Exception status number (response status code).',
                },
                {
                    title: 'message: string',
                    icon: DescriptionTreeIconProperty,
                    description: 'Exception message.',
                },
                {
                    title: 'errorData?: any',
                    icon: DescriptionTreeIconProperty,
                    description: 'Additional error data.',
                },
            ],
        },
    ],
};
