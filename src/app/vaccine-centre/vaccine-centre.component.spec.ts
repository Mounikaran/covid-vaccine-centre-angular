import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCentreComponent } from './vaccine-centre.component';

describe('VaccineCentreComponent', () => {
  let component: VaccineCentreComponent;
  let fixture: ComponentFixture<VaccineCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
