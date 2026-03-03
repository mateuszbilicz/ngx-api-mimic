import { NgxApiMimicMockSchema } from './mock-schema';
import { MockSchemaOf } from '../api/data-mock';

export class NgxApiMimicMockData<T> extends NgxApiMimicMockSchema<T> {
  private name: string = 'blank';
  private preventStore: boolean = true;

  constructor(name: string, schema: MockSchemaOf<T>, noStore?: boolean) {
    super();
    this.name = name;
    this.preventStore = noStore ?? true;
    if (this.preventStore) {
      this._$setStore = (name: string, value: any) => {};
      this._$getStore = (name: string): T => this._data;
      this._$deleteStore = (name: string) => {};
      this._data = super._$generateVal(schema) as T;
    } else {
      let v = this._$getStore(name);
      if (!v) {
        this._data = super._$generateVal(schema) as T;
        this._$setStore(this.name, this._data);
      } else {
        this._data = v;
      }
    }
  }

  private _data: T;

  /** Returns mocked data */
  get data(): T {
    return this._data;
  }

  /** Overwrites mocked data */
  set data(v: T) {
    this._$setStore(this.name, v);
    this._data = v;
  }

  /** Updates localStorage store value */
  _$setStore(name: string, value: T) {
    const storeFullName = 'mock-' + name;
    localStorage.setItem(
      storeFullName,
      JSON.stringify({
        name: name,
        savedAt: new Date(),
        value: value,
      }),
    );
  }

  /** Completely removes stored mocked data from localStorage */
  _$deleteStore(name: string) {
    localStorage.removeItem('mock-' + name);
  }

  /** Returns current localStorage store value */
  _$getStore(name: string, defaultValue?: any): T {
    const storeFullName = 'mock-' + name,
      stored = localStorage.getItem(storeFullName);
    if (!stored) return defaultValue ?? null;
    return JSON.parse(stored).value as T;
  }
}
