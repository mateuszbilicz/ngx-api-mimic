import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {Tag} from "primeng/tag";
import { Clipboard } from '@angular/cdk/clipboard';
import { BehaviorSubject, filter, shareReplay, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-command',
  imports: [Tag],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandComponent {
  protected readonly clipboard = inject(Clipboard);
  command = input.required<string>();
  copyToClipboardResult$ = new BehaviorSubject<'success' | 'danger' | 'secondary'>('secondary');
  copyToClipboardResultSeverity = toSignal(this.copyToClipboardResult$);

  constructor() {
    this.copyToClipboardResult$
      .pipe(
        takeUntilDestroyed(),
        filter((severity) => severity !== 'secondary'),
        shareReplay(1),
        switchMap(() => timer(1250)),
      )
      .subscribe(() => this.copyToClipboardResult$.next('secondary'));
  }

  copyToClipboard() {
    this.copyToClipboardResult$.next(this.clipboard.copy(this.command()) ? 'success' : 'danger');
  }
}
