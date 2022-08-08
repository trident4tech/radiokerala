import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayreportobComponent } from './dayreportob.component';

describe('DayreportobComponent', () => {
  let component: DayreportobComponent;
  let fixture: ComponentFixture<DayreportobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayreportobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayreportobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
