export const classCode = `import { Injectable } from '@angular/core';
import { NgxApiMimicMockData } from 'ngx-api-mimic';

export interface DataMockBasic_Item {
  id: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataMockBasicExampleService extends NgxApiMimicMockData<DataMockBasic_Item[]> {
  constructor() {
    super('data-mock-basic', {
      type: 'array',
      itemCount: 15,
      item: {
        type: 'object',
        items: {
          id: { type: 'string', minLength: 5, maxLength: 8 },
          name: { type: 'string', minLength: 5, maxLength: 10 },
          price: { type: 'number', min: 10, max: 1000, round: true, precision: 2 }
        }
      }
    });
  }

  getItems(): DataMockBasic_Item[] {
    return this.data;
  }
  
  createItem(item: Omit<DataMockBasic_Item, 'id'>): DataMockBasic_Item {
    const newItem: DataMockBasic_Item = { 
      ...item, 
      id: this._$generateRandomString(6, 6) 
    };
    this.data = [...this.data, newItem];
    return newItem;
  }

  updateItem(id: string, update: Partial<DataMockBasic_Item>): DataMockBasic_Item | undefined {
    this.data = this.data.map(i => i.id === id ? { ...i, ...update } : i);
    return this.data.find(i => i.id === id);
  }

  deleteItem(id: string): void {
    this.data = this.data.filter(i => i.id !== id);
  }
}`;

