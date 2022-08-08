import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsraclComponent } from './usracl.component';

describe('UsraclComponent', () => {
  let component: UsraclComponent;
  let fixture: ComponentFixture<UsraclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsraclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsraclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
