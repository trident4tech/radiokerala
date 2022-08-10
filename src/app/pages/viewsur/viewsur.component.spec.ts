import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsurComponent } from './viewsur.component';

describe('ViewsurComponent', () => {
  let component: ViewsurComponent;
  let fixture: ComponentFixture<ViewsurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
