# AI Agent Guidelines: API Documentation Maintenance

When making structural or interface changes to the `ngx-api-mimic` library code located in `projects/ngx-api-mimic/src/lib`, you will often be asked to update the API documentation found in the current directory (`src/app/views/docs-view`). 

This document serves to explain how the documentation data structures are implemented so that you can quickly understand what needs updating.

## Data Structures (`DescriptionTreeBranch`)

We use a custom structure composed of classes, decorators, methods, etc., rendered using the `DescriptionTreeComponent` defined in `src/app/core/elements/description-tree`.

The data arrays are grouped into lazy-loaded files to avoid bloating main bundles:
- `api-mock-class.tree.ts` - Core infrastructure APIs
- `api-mock-decorators.tree.ts` - Decorators
- `api-mock-pipes.tree.ts` - Available pipes
- `api-mock-types.tree.ts` - TypeScript interfaces and types for API Mock
- `data-mock-class.tree.ts` - Classes for Mock Data
- `data-mock-types.tree.ts` - TypeScript interfaces and types for Data Mock

## Structure Syntax

The structure typically looks like this:

```typescript
export const someTree: DescriptionTreeBranch = {
  title: 'Group Title',
  description: 'Group Description',
  items: [
    {
      title: 'ItemName',
      icon: DescriptionTreeIconClass, // See below for available icons
      description: 'What this class does',
      items: [
        {
          title: 'methodName(arg: type): returnType',
          icon: DescriptionTreeIconMethod,
          description: 'Description of the method',
        }
      ]
    }
  ]
};
```

### Important Rule Regarding Markdown and Titles
Do **NOT** use multiline string literals (backticks returning newlines) for the `title` fields inside items. Always use `''` or a single-line backtick string if needed. Multiline string titles break the UI by introducing spaces and trailing commas as they wrap.

**INCORRECT**:
```typescript
{
  title: `myMethod(
    arg1: string,
    arg2: number
  ): string`,
  // ...
}
```

**CORRECT**:
```typescript
{
  title: 'myMethod(arg1: string, arg2: number): string',
  // ...
}
```

## Available Icons

When documenting new items, be sure to import and use the correct icon from `src/app/core/api/description-tree.ts`. These include:

- `DescriptionTreeIconClass` (orange box) - for standard ES6/Angular Classes
- `DescriptionTreeIconInterface` (orange book) - for Interfaces
- `DescriptionTreeIconType` (violet info) - for Types
- `DescriptionTreeIconMethod` (blue hammer) - for Methods and Functions
- `DescriptionTreeIconDecorator` (violet info circle) - for Angular and Custom Decorators
- `DescriptionTreeIconProperty` (green text icon) - for Properties, Variables, and Config fields

## Connecting Trees to Components

Because we use lazy loading, to use the tree files in the Component (`api-mock-view.component.ts` or `data-mock-view.component.ts`), we load them via `import()` inside `ngOnInit()`, resolving to an Angular `signal` which is then rendered on the view template:

```typescript
// Example Component
classTree = signal<DescriptionTreeBranch>({ title: 'Loading...', description: '...', items: [] });

ngOnInit() {
  import('./filename.tree').then(t => this.classTree.set(t.filenameTree));
}
```

If you add a new category, remember to:
1. Create its dedicated `*.tree.ts` file.
2. Initialize an empty signal variable in the host `.component.ts`.
3. Chain the `import()` promise in `ngOnInit`.
4. Bind it using the signal getter syntax (`[branch]="newTree()"`) inside the `.component.html`.
