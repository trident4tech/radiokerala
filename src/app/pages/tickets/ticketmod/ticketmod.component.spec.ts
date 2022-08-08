import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketmodComponent } from './ticketmod.component';

describe('TicketmodComponent', () => {
  let component: TicketmodComponent;
  let fixture: ComponentFixture<TicketmodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketmodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
