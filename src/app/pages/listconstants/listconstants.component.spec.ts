import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconstantsComponent } from './listconstants.component';

describe('ListconstantsComponent', () => {
  let component: ListconstantsComponent;
  let fixture: ComponentFixture<ListconstantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconstantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListconstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
