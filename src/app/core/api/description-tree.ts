export interface DescriptionTreeBranch {
  title: string;
  icon?: string;
  description: string;
  url?: string[];
  items?: DescriptionTreeBranch[];
}

export const DescriptionTreeIconType = 'pi pi-hashtag text-blue-400';
export const DescriptionTreeIconInterface = 'pi pi-book text-orange-500';
export const DescriptionTreeIconClass = 'pi pi-box text-orange-700';
export const DescriptionTreeIconMethod = 'pi pi-hammer text-blue-600';
