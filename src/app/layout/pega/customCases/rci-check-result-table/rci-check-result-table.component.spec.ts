import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RciCheckResultTableComponent } from './rci-check-result-table.component';

describe('RciCheckResultTableComponent', () => {
  let component: RciCheckResultTableComponent;
  let fixture: ComponentFixture<RciCheckResultTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RciCheckResultTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RciCheckResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
