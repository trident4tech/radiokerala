import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketdataComponent } from './ticketdata.component';

describe('TicketdataComponent', () => {
  let component: TicketdataComponent;
  let fixture: ComponentFixture<TicketdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
