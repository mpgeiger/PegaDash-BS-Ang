import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaOfferComponent } from './nba-offer.component';

describe('NbaOfferComponent', () => {
  let component: NbaOfferComponent;
  let fixture: ComponentFixture<NbaOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
