import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkuserComponent } from './linkuser.component';

describe('LinkuserComponent', () => {
  let component: LinkuserComponent;
  let fixture: ComponentFixture<LinkuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
