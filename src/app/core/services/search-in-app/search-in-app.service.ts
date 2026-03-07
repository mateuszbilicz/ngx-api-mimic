import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { AppSearchResult } from './search-in-app.interface';
import { DescriptionTreeBranch } from '../../api/description-tree';

@Injectable({
  providedIn: 'root',
})
export class SearchInAppService {
  private getSnippet(text: string, query: string): string {
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text.substring(0, 100) + '...';
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + query.length + 40);
    let snippet = text.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    return snippet;
  }

  private searchTree(
    branch: DescriptionTreeBranch | any,
    query: string,
    link: string[],
    results: AppSearchResult[],
  ) {
    const defaultIcon = 'pi pi-file'; // fallback for tree branch with no icon
    const icon = (branch as any).icon || defaultIcon;

    if (branch.title && branch.title.toLowerCase().includes(query)) {
      results.push({
        title: branch.title,
        icon: icon,
        matchedIn: 'Title',
        routerLink: link,
      });
    } else if (branch.description && branch.description.toLowerCase().includes(query)) {
      results.push({
        title: branch.title,
        icon: icon,
        matchedIn: 'Description',
        snippet: this.getSnippet(branch.description, query),
        routerLink: link,
      });
    }

    if (branch.items && Array.isArray(branch.items)) {
      for (const item of branch.items) {
        this.searchTree(item, query, link, results);
      }
    }
  }

  search(query: string): Observable<AppSearchResult[]> {
    if (!query || query.trim().length < 2) return of([]);
    const q = query.toLowerCase().trim();

    const apiTreeImports = Promise.all([
      import('../../../views/docs-view/views/api-mock-view/api-mock-class.tree'),
      import('../../../views/docs-view/views/api-mock-view/api-mock-decorators.tree'),
      import('../../../views/docs-view/views/api-mock-view/api-mock-pipes.tree'),
      import('../../../views/docs-view/views/api-mock-view/api-mock-types.tree'),
    ]).then((modules) => modules.map((m: any) => Object.values(m)[0] as DescriptionTreeBranch));

    const dataTreeImports = Promise.all([
      import('../../../views/docs-view/views/data-mock-view/data-mock-class.tree'),
      import('../../../views/docs-view/views/data-mock-view/data-mock-types.tree'),
    ]).then((modules) => modules.map((m: any) => Object.values(m)[0] as DescriptionTreeBranch));

    const examplesImports = Promise.all([
      import('../../../views/docs-view/views/examples-view/views/examples-api-mock-basic-view/examples-api-mock-basic-data'),
      import('../../../views/docs-view/views/examples-view/views/examples-api-mock-advanced-view/examples-api-mock-advanced-data'),
      import('../../../views/docs-view/views/examples-view/views/examples-data-mock-basic-view/examples-data-mock-basic-data'),
      import('../../../views/docs-view/views/examples-view/views/examples-data-mock-advanced-view/examples-data-mock-advanced-data'),
      import('../../../views/docs-view/views/examples-view/views/examples-mixed-basic-view/examples-mixed-basic-data'),
      import('../../../views/docs-view/views/examples-view/views/examples-mixed-advanced-view/examples-mixed-advanced-data'),
    ]);

    const testingImports = Promise.all([
      import('../../../views/docs-view/views/testing-view/testing-view-data'),
    ]);

    return from(
      Promise.all([apiTreeImports, dataTreeImports, examplesImports, testingImports]),
    ).pipe(
      map(([apiTrees, dataTrees, examplesData, testingData]) => {
        const results: AppSearchResult[] = [];

        for (const tree of apiTrees) {
          if (tree) this.searchTree(tree, q, ['/', 'docs', 'api-mock'], results);
        }

        for (const tree of dataTrees) {
          if (tree) this.searchTree(tree, q, ['/', 'docs', 'data-mock'], results);
        }

        const exampleLinks = [
          ['/', 'docs', 'examples', 'api-mock-basic'],
          ['/', 'docs', 'examples', 'api-mock-advanced'],
          ['/', 'docs', 'examples', 'data-mock-basic'],
          ['/', 'docs', 'examples', 'data-mock-advanced'],
          ['/', 'docs', 'examples', 'mixed-basic'],
          ['/', 'docs', 'examples', 'mixed-advanced'],
        ];
        const exampleTitles = [
          'API Mock Basic',
          'API Mock Advanced',
          'Data Mock Basic',
          'Data Mock Advanced',
          'Mixed Basic',
          'Mixed Advanced',
        ];

        examplesData.forEach((mod: any, index: number) => {
          const codes = Object.values(mod) as string[];
          for (const code of codes) {
            if (typeof code === 'string' && code.toLowerCase().includes(q)) {
              results.push({
                title: exampleTitles[index],
                icon: 'pi pi-code',
                matchedIn: 'Code block',
                snippet: this.getSnippet(code, q),
                routerLink: exampleLinks[index],
              });
              break; // Ensure we only push one code match per example to avoid cluster
            }
          }
        });

        testingData.forEach((mod: any) => {
          const codes = Object.values(mod) as string[];
          for (const code of codes) {
            if (typeof code === 'string' && code.toLowerCase().includes(q)) {
              results.push({
                title: 'Testing',
                icon: 'pi pi-check-circle',
                matchedIn: 'Testing Document',
                snippet: this.getSnippet(code, q),
                routerLink: ['/', 'docs', 'testing'],
              });
              break;
            }
          }
        });

        // Deduplicate or limit
        return results.slice(0, 50);
      }),
    );
  }
}
