import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesMixedAdvancedViewComponent } from './examples-mixed-advanced-view.component';

describe('ExamplesMixedAdvancedViewComponent', () => {
  let component: ExamplesMixedAdvancedViewComponent;
  let fixture: ComponentFixture<ExamplesMixedAdvancedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplesMixedAdvancedViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamplesMixedAdvancedViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
