import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationViewComponent } from './installation-view.component';

describe('InstallationViewComponent', () => {
  let component: InstallationViewComponent;
  let fixture: ComponentFixture<InstallationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallationViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallationViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
