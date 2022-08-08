import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterviewComponent } from './masterview.component';

describe('MasterviewComponent', () => {
  let component: MasterviewComponent;
  let fixture: ComponentFixture<MasterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
