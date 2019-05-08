import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InCorrAutoReplyTrendComponent } from './in-corr-auto-reply-trend.component';

describe('InCorrAutoReplyTrendComponent', () => {
  let component: InCorrAutoReplyTrendComponent;
  let fixture: ComponentFixture<InCorrAutoReplyTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InCorrAutoReplyTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InCorrAutoReplyTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
