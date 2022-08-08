import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisdashboardComponent } from './misdashboard.component';

describe('MisdashboardComponent', () => {
  let component: MisdashboardComponent;
  let fixture: ComponentFixture<MisdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
