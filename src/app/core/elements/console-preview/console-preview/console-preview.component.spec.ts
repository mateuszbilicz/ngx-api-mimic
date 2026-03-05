import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePreviewComponent } from './console-preview.component';

describe('ConsolePreviewComponent', () => {
  let component: ConsolePreviewComponent;
  let fixture: ComponentFixture<ConsolePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolePreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsolePreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
