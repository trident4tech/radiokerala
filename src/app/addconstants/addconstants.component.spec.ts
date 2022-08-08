import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconstantsComponent } from './addconstants.component';

describe('AddconstantsComponent', () => {
  let component: AddconstantsComponent;
  let fixture: ComponentFixture<AddconstantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddconstantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
