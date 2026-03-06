import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTreeComponent } from './description-tree.component';

describe('DescriptionTreeComponent', () => {
  let component: DescriptionTreeComponent;
  let fixture: ComponentFixture<DescriptionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionTreeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
