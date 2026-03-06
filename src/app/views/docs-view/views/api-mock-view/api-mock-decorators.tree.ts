import {
    DescriptionTreeBranch,
    DescriptionTreeIconDecorator,
    DescriptionTreeIconProperty
} from '../../../../core/api/description-tree';

export const apiMockDecoratorsTree: DescriptionTreeBranch = {
    title: 'Decorators',
    description: 'Available decorators to let you build controllers and endpoints.',
    items: [
        {
            title: '@Controller(basePath: string)',
            icon: DescriptionTreeIconDecorator,
            description: 'Class decorator that turns class into API Mock Controller.',
            items: [
                {
                    title: 'basePath: string',
                    icon: DescriptionTreeIconProperty,
                    description:
                        'Base path of the controller - in api calls: /<router_prefix>/<controller_base_path>/<endpoint>',
                },
            ],
        },
        {
            title: '@UseGuards(...guards: (Class<CanActivate> | CanActivate)[])',
            icon: DescriptionTreeIconDecorator,
            description: 'Adds guards to the controller.',
            items: [
                {
                    title: '...guards: (Class<CanActivate> | CanActivate)[]',
                    icon: DescriptionTreeIconProperty,
                    description: 'Guard classes that extend CanActivate guard class.',
                },
            ],
        },
        {
            title: '@Get(path: string)',
            icon: DescriptionTreeIconDecorator,
            description: 'HTTP GET method endpoint.',
            items: [
                {
                    title: 'path: string',
                    icon: DescriptionTreeIconProperty,
                    description:
                        'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
                },
            ],
        },
        {
            title: '@Post(path: string)',
            icon: DescriptionTreeIconDecorator,
            description: 'HTTP POST method endpoint.',
            items: [
                {
                    title: 'path: string',
                    icon: DescriptionTreeIconProperty,
                    description:
                        'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
                },
            ],
        },
        {
            title: '@Put(path: string)',
            icon: DescriptionTreeIconDecorator,
            description: 'HTTP PUT method endpoint.',
            items: [
                {
                    title: 'path: string',
                    icon: DescriptionTreeIconProperty,
                    description:
                        'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
                },
            ],
        },
        {
            title: '@Delete(path: string)',
            icon: DescriptionTreeIconDecorator,
            description: 'HTTP DELETE method endpoint.',
            items: [
                {
                    title: 'path: string',
                    icon: DescriptionTreeIconProperty,
                    description:
                        'Endpoint path inside the route. Paths support url params (e.g. /byId/:id).',
                },
            ],
        },
        {
            title: '@Query(name: string, ...pipes: (Class<PipeTransform> | PipeTransform)[])',
            icon: DescriptionTreeIconDecorator,
            description: 'Injects specific query parameter.',
            items: [
                {
                    title: 'name: string',
                    icon: DescriptionTreeIconProperty,
                    description: 'Name of the query parameter.',
                },
                {
                    title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
                    icon: DescriptionTreeIconProperty,
                    description: `Adds pipes classes to the variable injector.`,
                },
            ],
        },
        {
            title: '@Body(...pipes: (Class<PipeTransform> | PipeTransform)[])',
            icon: DescriptionTreeIconDecorator,
            description: 'Injects the request body.',
            items: [
                {
                    title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
                    icon: DescriptionTreeIconProperty,
                    description: `Adds pipes classes to the variable injector.`,
                },
            ],
        },
        {
            title: '@UrlParam(...pipes: (Class<PipeTransform> | PipeTransform)[])',
            icon: DescriptionTreeIconDecorator,
            description: 'Injects specific URL path parameter.',
            items: [
                {
                    title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
                    icon: DescriptionTreeIconProperty,
                    description: `Adds pipes classes to the variable injector.`,
                },
            ],
        },
        {
            title: '@Headers(...pipes: (Class<PipeTransform> | PipeTransform)[])',
            icon: DescriptionTreeIconDecorator,
            description: 'Injects specific header.',
            items: [
                {
                    title: '...pipes: (Class<PipeTransform> | PipeTransform)[]',
                    icon: DescriptionTreeIconProperty,
                    description: `Adds pipes classes to the variable injector.`,
                },
            ],
        },
    ],
};
