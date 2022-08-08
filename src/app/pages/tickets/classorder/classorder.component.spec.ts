import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassorderComponent } from './classorder.component';

describe('ClassorderComponent', () => {
  let component: ClassorderComponent;
  let fixture: ComponentFixture<ClassorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
