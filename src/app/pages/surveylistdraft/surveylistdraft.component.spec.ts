import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveylistdraftComponent } from './surveylistdraft.component';

describe('SurveylistdraftComponent', () => {
  let component: SurveylistdraftComponent;
  let fixture: ComponentFixture<SurveylistdraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveylistdraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveylistdraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
