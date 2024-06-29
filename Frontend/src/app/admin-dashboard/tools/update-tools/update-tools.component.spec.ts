import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToolsComponent } from './update-tools.component';

describe('UpdateToolsComponent', () => {
  let component: UpdateToolsComponent;
  let fixture: ComponentFixture<UpdateToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
