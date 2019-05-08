import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTrendIndicatorArrowComponent } from './value-trend-indicator-arrow.component';

describe('ValueTrendIndicatorArrowComponent', () => {
  let component: ValueTrendIndicatorArrowComponent;
  let fixture: ComponentFixture<ValueTrendIndicatorArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueTrendIndicatorArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTrendIndicatorArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
