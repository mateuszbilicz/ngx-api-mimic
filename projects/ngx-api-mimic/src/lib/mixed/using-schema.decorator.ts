import { NgxApiMimicMockData } from '../data-mock/mock-data';
import { MockSchemaOf } from '../api/data-mock';

/** Makes Controller class contain data generated from schematic. Data can be accessed by this.data */
export function UsingSchema<T>(storeName: string | undefined, schema: MockSchemaOf<T>) {
  return function (constructor: Function) {
    const original = constructor;
    const newConstructor: any = function (...args: any[]) {
      const instance = new (original as any)(...args);
      const finalStoreName = storeName || 'temp-store-' + Math.random().toString(36).substring(7);
      const preventStore = !storeName;
      const mockDataHandler = new NgxApiMimicMockData<T>(finalStoreName, schema, preventStore);
      Object.defineProperty(instance, 'data', {
        get: () => mockDataHandler.data,
        set: (v: T) => (mockDataHandler.data = v),
        enumerable: true,
        configurable: true,
      });
      return instance;
    };
    newConstructor.prototype = original.prototype;
    return newConstructor;
  };
}
