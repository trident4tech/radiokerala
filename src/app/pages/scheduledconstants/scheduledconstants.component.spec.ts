import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledconstantsComponent } from './scheduledconstants.component';

describe('ScheduledconstantsComponent', () => {
  let component: ScheduledconstantsComponent;
  let fixture: ComponentFixture<ScheduledconstantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledconstantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledconstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
