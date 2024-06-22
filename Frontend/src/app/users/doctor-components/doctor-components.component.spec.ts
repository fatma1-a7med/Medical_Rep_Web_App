import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorComponentsComponent } from './doctor-components.component';

describe('DoctorComponentsComponent', () => {
  let component: DoctorComponentsComponent;
  let fixture: ComponentFixture<DoctorComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
