import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTreasurerCaseListComponent } from './recentTreasurerCaseList.component';

describe('RecentTreasurerCaseListComponent', () => {
  let component: RecentTreasurerCaseListComponent;
  let fixture: ComponentFixture<RecentTreasurerCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTreasurerCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTreasurerCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
