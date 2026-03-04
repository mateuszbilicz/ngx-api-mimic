import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsDefaultViewComponent } from './docs-default-view.component';

describe('DocsDefaultViewComponent', () => {
  let component: DocsDefaultViewComponent;
  let fixture: ComponentFixture<DocsDefaultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsDefaultViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsDefaultViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
