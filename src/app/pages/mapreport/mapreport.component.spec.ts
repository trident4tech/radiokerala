import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapreportComponent } from './mapreport.component';

describe('MapreportComponent', () => {
  let component: MapreportComponent;
  let fixture: ComponentFixture<MapreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
