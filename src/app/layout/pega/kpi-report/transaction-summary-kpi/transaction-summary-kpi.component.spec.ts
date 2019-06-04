import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSummaryKpiComponent } from './transaction-summary-kpi.component';

describe('TransactionSummaryKpiComponent', () => {
  let component: TransactionSummaryKpiComponent;
  let fixture: ComponentFixture<TransactionSummaryKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionSummaryKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSummaryKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
