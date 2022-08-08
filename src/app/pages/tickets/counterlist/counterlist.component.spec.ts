import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterlistComponent } from './counterlist.component';

describe('CounterlistComponent', () => {
  let component: CounterlistComponent;
  let fixture: ComponentFixture<CounterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
