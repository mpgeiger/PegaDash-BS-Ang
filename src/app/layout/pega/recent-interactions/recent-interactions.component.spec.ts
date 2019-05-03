import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentInteractionsComponent } from './recent-interactions.component';

describe('RecentInteractionsComponent', () => {
  let component: RecentInteractionsComponent;
  let fixture: ComponentFixture<RecentInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
