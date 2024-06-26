import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolsComponent } from './add-tools.component';

describe('AddToolsComponent', () => {
  let component: AddToolsComponent;
  let fixture: ComponentFixture<AddToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
