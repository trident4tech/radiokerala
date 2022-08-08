import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestaddComponent } from './destadd.component';

describe('DestaddComponent', () => {
  let component: DestaddComponent;
  let fixture: ComponentFixture<DestaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
