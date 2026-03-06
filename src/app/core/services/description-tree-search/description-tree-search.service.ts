import { Injectable } from '@angular/core';
import { DescriptionTreeBranch } from '../../api/description-tree';

@Injectable({
  providedIn: 'root',
})
export class DescriptionTreeSearchService {
  searchInTree(searchText: string, branch: DescriptionTreeBranch): DescriptionTreeBranch {
    if (!searchText) return branch;

    const lowerSearchText = searchText.toLowerCase();

    function filterBranch(node: DescriptionTreeBranch): DescriptionTreeBranch | null {
      const matchesSelf =
        (node.title && node.title.toLowerCase().includes(lowerSearchText)) ||
        (node.description && node.description.toLowerCase().includes(lowerSearchText));

      let validItems: DescriptionTreeBranch[] = [];

      if (node.items && node.items.length > 0) {
        for (const child of node.items) {
          const filteredChild = filterBranch(child);
          if (filteredChild) {
            validItems.push(filteredChild);
          }
        }
      }

      if (matchesSelf || validItems.length > 0) {
        return {
          ...node,
          items: validItems.length > 0 ? validItems : (node.items ? undefined : undefined),
        };
      }

      return null;
    }

    const res = filterBranch(branch);
    if (!res) {
      return { ...branch, items: [] };
    }
    return res;
  }
}
