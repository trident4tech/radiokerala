import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestuserComponent } from './destuser.component';

describe('DestuserComponent', () => {
  let component: DestuserComponent;
  let fixture: ComponentFixture<DestuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
