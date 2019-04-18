import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenByWorkTypeComponent } from './open-by-work-type.component';

describe('OpenByWorkTypeComponent', () => {
  let component: OpenByWorkTypeComponent;
  let fixture: ComponentFixture<OpenByWorkTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenByWorkTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenByWorkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
