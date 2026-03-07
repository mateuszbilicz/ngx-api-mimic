import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingViewComponent } from './testing-view.component';

describe('TestingViewComponent', () => {
  let component: TestingViewComponent;
  let fixture: ComponentFixture<TestingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
