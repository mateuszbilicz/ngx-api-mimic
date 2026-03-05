import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesViewComponent } from './examples-view.component';

describe('ExamplesViewComponent', () => {
  let component: ExamplesViewComponent;
  let fixture: ComponentFixture<ExamplesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamplesViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
