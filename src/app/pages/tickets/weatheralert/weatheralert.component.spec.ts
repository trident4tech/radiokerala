import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatheralertComponent } from './weatheralert.component';

describe('WeatheralertComponent', () => {
  let component: WeatheralertComponent;
  let fixture: ComponentFixture<WeatheralertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatheralertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatheralertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
