import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMockViewComponent } from './data-mock-view.component';

describe('DataMockViewComponent', () => {
  let component: DataMockViewComponent;
  let fixture: ComponentFixture<DataMockViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataMockViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataMockViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
