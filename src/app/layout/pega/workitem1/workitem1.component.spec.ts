import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Workitem1Component } from './workitem1.component';

describe('Workitem1Component', () => {
  let component: Workitem1Component;
  let fixture: ComponentFixture<Workitem1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Workitem1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Workitem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
