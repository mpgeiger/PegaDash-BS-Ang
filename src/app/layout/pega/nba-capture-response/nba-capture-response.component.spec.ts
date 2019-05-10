import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaCaptureResponseComponent } from './nba-capture-response.component';

describe('NbaCaptureResponseComponent', () => {
  let component: NbaCaptureResponseComponent;
  let fixture: ComponentFixture<NbaCaptureResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaCaptureResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaCaptureResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
