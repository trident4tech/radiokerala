import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestviewComponent } from './destview.component';

describe('DestviewComponent', () => {
  let component: DestviewComponent;
  let fixture: ComponentFixture<DestviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
