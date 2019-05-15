import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RciMashupComponent } from './rci-mashup.component';

describe('RciMashupComponent', () => {
  let component: RciMashupComponent;
  let fixture: ComponentFixture<RciMashupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RciMashupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RciMashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
