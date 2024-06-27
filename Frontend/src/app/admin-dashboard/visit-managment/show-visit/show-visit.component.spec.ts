import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVisitComponent } from './show-visit.component';

describe('ShowVisitComponent', () => {
  let component: ShowVisitComponent;
  let fixture: ComponentFixture<ShowVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
