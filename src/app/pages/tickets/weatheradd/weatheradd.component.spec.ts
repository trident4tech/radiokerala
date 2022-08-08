import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatheraddComponent } from './weatheradd.component';

describe('WeatheraddComponent', () => {
  let component: WeatheraddComponent;
  let fixture: ComponentFixture<WeatheraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatheraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatheraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
