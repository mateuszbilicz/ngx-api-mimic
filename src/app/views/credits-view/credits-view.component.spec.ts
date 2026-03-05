import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsViewComponent } from './credits-view.component';

describe('CreditsViewComponent', () => {
  let component: CreditsViewComponent;
  let fixture: ComponentFixture<CreditsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditsViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
