import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRecentTreasurerComponent } from './status-recent-treasurer.component';

describe('StatusRecentTreasurerComponent', () => {
  let component: StatusRecentTreasurerComponent;
  let fixture: ComponentFixture<StatusRecentTreasurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusRecentTreasurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusRecentTreasurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
