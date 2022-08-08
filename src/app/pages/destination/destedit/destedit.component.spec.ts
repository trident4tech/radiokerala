import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesteditComponent } from './destedit.component';

describe('DesteditComponent', () => {
  let component: DesteditComponent;
  let fixture: ComponentFixture<DesteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
