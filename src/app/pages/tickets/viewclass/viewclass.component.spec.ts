import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewclassComponent } from './viewclass.component';

describe('ViewclassComponent', () => {
  let component: ViewclassComponent;
  let fixture: ComponentFixture<ViewclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
