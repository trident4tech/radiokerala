import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathereditComponent } from './weatheredit.component';

describe('WeathereditComponent', () => {
  let component: WeathereditComponent;
  let fixture: ComponentFixture<WeathereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeathereditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
