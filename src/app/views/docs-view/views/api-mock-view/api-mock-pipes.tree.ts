import {
  DescriptionTreeBranch,
  DescriptionTreeIconClass,
} from '../../../../core/api/description-tree';

export const apiMockPipesTree: DescriptionTreeBranch = {
  title: 'Pipes',
  description: 'Pipes that modify injected variable.',
  items: [
    {
      title: 'ParseIntPipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to number and validates the type.',
    },
    {
      title: 'ParseUUIDPipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to string (UUID format) and validates the type.',
    },
    {
      title: 'DefaultValuePipe(defaultValue: any)',
      icon: DescriptionTreeIconClass,
      description: 'Converts passes variable or default value.',
    },
    {
      title: 'ParseFloatPipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to number and validates the type.',
    },
    {
      title: 'ParseBoolPipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string | boolean to boolean and validates the type.',
    },
    {
      title: 'ParseDatePipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to Date and validates the type.',
    },
    {
      title: 'ParseEnumPipe(enum: object)',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to enum and validates the type.',
    },
    {
      title: 'ParseArrayPipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to array (by "," delimiter) and validates the type.',
    },
    {
      title: 'ParseFilePipe',
      icon: DescriptionTreeIconClass,
      description: 'Converts string to File | Blob and validates the type.',
    },
  ],
};
