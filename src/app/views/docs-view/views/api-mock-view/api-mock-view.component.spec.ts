import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMockViewComponent } from './api-mock-view.component';

describe('ApiMockViewComponent', () => {
  let component: ApiMockViewComponent;
  let fixture: ComponentFixture<ApiMockViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiMockViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiMockViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
