import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Panel } from 'primeng/panel';
import { Clipboard } from '@angular/cdk/clipboard';
import { Button } from 'primeng/button';
import { BehaviorSubject, filter, shareReplay, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-code-viewer',
  imports: [EditorComponent, FormsModule, NgTemplateOutlet, Panel, Button],
  templateUrl: './code-viewer.component.html',
  styleUrl: './code-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeViewerComponent {
  protected readonly clipboard = inject(Clipboard);
  filename = input<string | undefined>(undefined);
  code = input<string>('');
  language = input<string>('typescript');
  readonly = input<boolean>(true);
  minimap = input<boolean>(false);
  height = input<string | number>('5rem');
  editorOptions = computed(() => ({
    theme: 'vs-dark',
    language: this.language(),
    readOnly: this.readonly(),
    minimap: {
      enabled: this.minimap(),
    },
  }));
  hasFilename = computed(() => !!this.filename());
  editorHeight = computed(() =>
    typeof this.height() === 'string' ? this.height() : `${this.height()}px`,
  );
  copyToClipboardResult$ = new BehaviorSubject<'success' | 'danger' | 'help'>('help');
  copyToClipboardResultSeverity = toSignal(this.copyToClipboardResult$);

  constructor() {
    this.copyToClipboardResult$
      .pipe(
        takeUntilDestroyed(),
        filter((severity) => severity !== 'help'),
        shareReplay(1),
        switchMap(() => timer(1250)),
      )
      .subscribe(() => this.copyToClipboardResult$.next('help'));
  }

  copyToClipboard() {
    this.copyToClipboardResult$.next(this.clipboard.copy(this.code()) ? 'success' : 'danger');
  }
}
