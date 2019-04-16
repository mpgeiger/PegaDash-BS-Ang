import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PegaPieChartComponent } from './pega-pie-chart.component';

describe('PegaPieChartComponent', () => {
  let component: PegaPieChartComponent;
  let fixture: ComponentFixture<PegaPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PegaPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PegaPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
