import { MockBase, NgxApiMimicMockDataType, NgxApiMimicMockDataValOptions } from './mock-base';

export interface NgxApiMimicSchemaDefinition extends NgxApiMimicMockDataValOptions {
  type: NgxApiMimicMockDataType;
  staticValue?: any;
  items?: {
    [key: string]: NgxApiMimicSchemaDefinition;
  };
  item?: NgxApiMimicSchemaDefinition;
  itemCount?: number;
}

export class MockSchema<T>
  extends MockBase {

  name: string = 'blank';
  preventStore: boolean = true;

  constructor(name: string,
              schema: NgxApiMimicSchemaDefinition,
              noStore?: boolean) {
    super();
    this.name = name;
    this.preventStore = noStore ?? true;
    if (this.preventStore) {
      this.setStore = (name: string, value: any) => {};
      this.getStore = <T>(name: string): T => this._data as unknown as T;
      this.deleteStore = (name: string) => {};
      this._data = this.generateFromDef(schema) as T;
    } else {
      let v = this.getStore<T>(name);
      if (!v) {
        this._data = this.generateFromDef(schema) as T;
        this.setStore(this.name, this._data);
      } else {
        this._data = v;
      }
    }
  }

  _data: T;

  get data(): T {
    return this._data;
  }

  set data(v: T) {
    this.setStore(this.name, v);
    this._data = v;
  }

  generateFromDef(elem: NgxApiMimicSchemaDefinition): any {
    switch (elem.type) {
      case 'array':
        return this.generateArrayFromSchema(elem);
      case 'object':
        return this.generateObjectFromSchema(elem);
      default:
        return this.generateVal(elem as NgxApiMimicMockDataValOptions) as any;
    }
  }

  generateArrayFromSchema(e: NgxApiMimicSchemaDefinition): T {
    let result: any[] = [];
    if (e.staticValue) {
      return e.staticValue as T;
    }
    for (let i = 0; i < (e.itemCount ?? 0); i++) {
      if (!e.item) throw new Error('No item schema defined for array');
      result.push(
        this.generateFromDef(e.item!)
      );
    }
    return result as T;
  }

  generateObjectFromSchema(obj: NgxApiMimicSchemaDefinition): any {
    let result: any = {};
    if (obj.staticValue) {
      return obj.staticValue as T;
    }
    if (!obj.items) throw new Error('Items schema not defined in object');
    Object.keys(obj.items!)
      .forEach(key => {
        const curr = obj.items![key];
        result[key] = this.generateFromDef(curr);
      });
    return result;
  }

}
