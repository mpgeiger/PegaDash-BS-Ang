import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxLayoutTestComponent } from './fx-layout-test.component';

describe('FxLayoutTestComponent', () => {
  let component: FxLayoutTestComponent;
  let fixture: ComponentFixture<FxLayoutTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxLayoutTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxLayoutTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
