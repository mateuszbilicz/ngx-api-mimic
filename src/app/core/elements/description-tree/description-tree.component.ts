import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { DescriptionTreeBranch } from '../../api/description-tree';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-description-tree',
  imports: [Button, RouterLink],
  templateUrl: './description-tree.component.html',
  styleUrl: './description-tree.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionTreeComponent {
  branch = input.required<DescriptionTreeBranch>();
  title = computed(() => this.branch().title);
  icon = computed(() => this.branch().icon);
  description = computed(() => this.branch().description);
  url = computed(() => this.branch().url);
  items = computed(() => this.branch().items);
  expanded = signal(false);
  expandIcon = computed(() => (this.expanded() ? 'chevron-down' : 'chevron-right'));

  toggle() {
    this.expanded.set(!this.expanded());
  }
}
