import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import {
  ConsoleLog,
  ConsoleLogSupportedType,
  ConsoleLogSupportedTypes,
  ConsoleReaderService,
} from '../../../services/console-reader/console-reader.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { shareReplay, switchMap, throttleTime } from 'rxjs';
import { map } from 'rxjs/operators';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { DatePipe } from '@angular/common';
import { Inplace } from 'primeng/inplace';
import { Tooltip } from 'primeng/tooltip';

interface StyledConsoleLog {
  uid: string;
  type: ConsoleLogSupportedType;
  time: Date;
  color: string;
  displayText: string[];
  expandText?: string;
  styles: Record<string, string>[];
}

@Component({
  selector: 'app-console-preview',
  imports: [Button, Drawer, FormsModule, MultiSelect, DatePipe, Inplace, Tooltip],
  templateUrl: './console-preview.component.html',
  styleUrl: './console-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConsoleReaderService],
})
export class ConsolePreviewComponent {
  protected readonly consoleReaderService = inject(ConsoleReaderService);
  consoleLogSupportedTypes = ConsoleLogSupportedTypes.map((type) => ({
    value: type,
  }));
  asFloatingButton = input<boolean>(false);
  selectedTypesFilter = signal<ConsoleLogSupportedType[]>([...ConsoleLogSupportedTypes]);
  logs = signal<StyledConsoleLog[]>([]);
  drawerVisible = signal<boolean>(false);
  buttonClasses = computed(() =>
    this.asFloatingButton()
      ? {
          fixed: true,
          'right-3': true,
          'bottom-3': true,
        }
      : {},
  );

  constructor() {
    const selectedTypesFilter$ = toObservable(this.selectedTypesFilter);
    toObservable(this.consoleReaderService.logs)
      .pipe(
        takeUntilDestroyed(),
        throttleTime(10),
        shareReplay(1),
        switchMap((logs) =>
          selectedTypesFilter$.pipe(
            map((filterTypes) => logs.filter((log) => filterTypes.includes(log.type))),
          ),
        ),
        map((logs) => this.transformLogs(logs)),
      )
      .subscribe((logs) => this.logs.set(logs));
  }

  clear() {
    this.consoleReaderService.clear();
  }

  private transformLogs(logs: ConsoleLog[]): StyledConsoleLog[] {
    return logs.map((log) => {
      const { data, type, time } = log;
      const displayText: string[] = [];
      const styles: Record<string, string>[] = [];
      let expandText: string | undefined = undefined;

      const uid = `${type}-${time.getTime()}-${Math.random().toString(36).substring(2, 5)}`;

      if (!data || data.length === 0) {
        return {
          uid,
          type,
          color: this.getLogColor(type),
          time,
          displayText: [''],
          styles: [{}],
          expandText,
        };
      }

      const errorArg = data.find((arg) => arg instanceof Error);
      if (errorArg) {
        expandText = errorArg.stack || errorArg.message;
      }

      const firstArg = data[0];
      let nextArgIndex = 0;

      if (typeof firstArg === 'string' && firstArg.includes('%c')) {
        const parts = firstArg.split('%c');

        if (parts[0] !== '') {
          displayText.push(parts[0]);
          styles.push({});
        }

        let styleIdx = 1;
        for (let i = 1; i < parts.length; i++) {
          displayText.push(parts[i]);
          const rawStyle = data[styleIdx];
          styles.push(typeof rawStyle === 'string' ? this.parseCss(rawStyle) : {});
          styleIdx++;
        }

        nextArgIndex = styleIdx;
      } else {
        nextArgIndex = 0;
      }

      for (let i = nextArgIndex; i < data.length; i++) {
        const item = data[i];
        let formatted: string;

        if (item instanceof Error) {
          formatted = `[Error: ${item.message}]`;
        } else if (typeof item === 'object' && item !== null) {
          try {
            formatted = JSON.stringify(item);
          } catch {
            formatted = '[Object]';
          }
        } else {
          formatted = String(item);
        }

        displayText.push(formatted);
        styles.push({});
      }

      return {
        uid,
        type,
        color: this.getLogColor(type),
        time,
        displayText,
        expandText,
        styles,
      };
    });
  }

  private getLogColor(type: ConsoleLogSupportedType) {
    switch (type) {
      case 'log':
        return 'gray';
      case 'error':
        return 'red';
      case 'warn':
        return 'orange';
    }
  }

  private parseCss(cssString: string): Record<string, string> {
    const styleObj: Record<string, string> = {};
    if (!cssString) return styleObj;

    cssString.split(';').forEach((rule) => {
      const [prop, value] = rule.split(':');
      if (prop && value) {
        const key = prop.trim().replace(/-./g, (x) => x[1].toUpperCase());
        styleObj[key] = value.trim();
      }
    });
    return styleObj;
  }
}
