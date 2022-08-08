import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestlistComponent } from './destlist.component';

describe('DestlistComponent', () => {
  let component: DestlistComponent;
  let fixture: ComponentFixture<DestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
