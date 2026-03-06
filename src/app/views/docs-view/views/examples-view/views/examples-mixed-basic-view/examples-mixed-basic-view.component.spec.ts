import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesMixedBasicViewComponent } from './examples-mixed-basic-view.component';

describe('ExamplesMixedBasicViewComponent', () => {
  let component: ExamplesMixedBasicViewComponent;
  let fixture: ComponentFixture<ExamplesMixedBasicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplesMixedBasicViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamplesMixedBasicViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
