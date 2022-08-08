import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywisereportComponent } from './daywisereport.component';

describe('DaywisereportComponent', () => {
  let component: DaywisereportComponent;
  let fixture: ComponentFixture<DaywisereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaywisereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaywisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
