import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeViewComponent } from './welcome-view.component';

describe('WelcomeViewComponent', () => {
  let component: WelcomeViewComponent;
  let fixture: ComponentFixture<WelcomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
