import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesDefaultViewComponent } from './examples-default-view.component';

describe('ExamplesDefaultViewComponent', () => {
  let component: ExamplesDefaultViewComponent;
  let fixture: ComponentFixture<ExamplesDefaultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplesDefaultViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamplesDefaultViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
