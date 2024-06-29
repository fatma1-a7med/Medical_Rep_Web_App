import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisitDialogComponent } from './update-visit-dialog.component';

describe('UpdateVisitDialogComponent', () => {
  let component: UpdateVisitDialogComponent;
  let fixture: ComponentFixture<UpdateVisitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVisitDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
