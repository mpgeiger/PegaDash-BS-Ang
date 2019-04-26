import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaTeaserComponent } from './nba-teaser.component';

describe('NbaTeaserComponent', () => {
  let component: NbaTeaserComponent;
  let fixture: ComponentFixture<NbaTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
