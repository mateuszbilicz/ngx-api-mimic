import { Injectable, OnDestroy, signal } from '@angular/core';

export const ConsoleLogSupportedTypes = ['log', 'error', 'warn'] as const;

export type ConsoleLogSupportedType = typeof ConsoleLogSupportedTypes[number];

export interface ConsoleLog {
  type: ConsoleLogSupportedType;
  time: Date;
  data: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ConsoleReaderService implements OnDestroy {
  private readonly defaultConsoleLog;
  private readonly defaultConsoleError;
  private readonly defaultConsoleWarn;
  logs = signal<ConsoleLog[]>([]);

  constructor() {
    this.defaultConsoleLog = console.log;
    this.defaultConsoleError = console.error;
    this.defaultConsoleWarn = console.warn;

    console.log = (...data: any[]) => {
      this.defaultConsoleLog(...data);
      this.addLog({
        type: 'log',
        time: new Date(),
        data: data
      });
    }

    console.error = (...data: any[]) => {
      this.defaultConsoleError(...data);
      this.addLog({
        type: 'error',
        time: new Date(),
        data: data,
      });
    }

    console.warn = (...data: any[]) => {
      this.defaultConsoleWarn(...data);
      this.addLog({
        type: 'warn',
        time: new Date(),
        data: data,
      });
    }
  }

  private addLog(log: ConsoleLog) {
    this.logs.update(prev => ([...prev, log]));
  }

  clear() {
    this.logs.set([]);
    console.clear();
  }

  ngOnDestroy() {
    console.log = this.defaultConsoleLog;
    console.error = this.defaultConsoleError;
    console.warn = this.defaultConsoleWarn;
  }
}
