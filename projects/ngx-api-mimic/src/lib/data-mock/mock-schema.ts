import { MockBase } from './mock-base';
import { NgxApiMimicMockDataValOptions, NgxApiMimicSchemaDefinition } from '../api/data-mock';

/** Mock schematic base class - extend your mocked data classes from this one */
export class MockSchema<T> extends MockBase {
  private name: string = 'blank';
  private preventStore: boolean = true;

  constructor(name: string, schema: NgxApiMimicSchemaDefinition, noStore?: boolean) {
    super();
    this.name = name;
    this.preventStore = noStore ?? true;
    if (this.preventStore) {
      this._$setStore = (name: string, value: any) => {};
      this._$getStore = <T>(name: string): T => this._data as unknown as T;
      this._$deleteStore = (name: string) => {};
      this._data = this._$generateFromDef(schema) as T;
    } else {
      let v = this._$getStore<T>(name);
      if (!v) {
        this._data = this._$generateFromDef(schema) as T;
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

  /** Function that generates random data based on schema regardless of its type */
  private _$generateFromDef(elem: NgxApiMimicSchemaDefinition): any {
    switch (elem.type) {
      case 'array':
        return this._$generateArrayFromSchema(elem);
      case 'object':
        return this._$generateObjectFromSchema(elem);
      default:
        return this._$generateVal(elem as NgxApiMimicMockDataValOptions) as any;
    }
  }

  /** Function that generates array of random data based on schema */
  private _$generateArrayFromSchema(e: NgxApiMimicSchemaDefinition): T {
    let result: any[] = [];
    if (e.staticValue) {
      return e.staticValue as T;
    }
    for (let i = 0; i < (e.itemCount ?? 0); i++) {
      if (!e.item) throw new Error('No item schema defined for array');
      result.push(this._$generateFromDef(e.item!));
    }
    return result as T;
  }

  /** Function that generates object of random data based on schema */
  private _$generateObjectFromSchema(obj: NgxApiMimicSchemaDefinition): any {
    let result: any = {};
    if (obj.staticValue) {
      return obj.staticValue as T;
    }
    if (!obj.items) throw new Error('Items schema not defined in object');
    Object.keys(obj.items!).forEach((key) => {
      const curr = obj.items![key];
      result[key] = this._$generateFromDef(curr);
    });
    return result;
  }
}
