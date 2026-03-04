import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeViewerComponent } from './code-viewer.component';

describe('CodeViewerComponent', () => {
  let component: CodeViewerComponent;
  let fixture: ComponentFixture<CodeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeViewerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
