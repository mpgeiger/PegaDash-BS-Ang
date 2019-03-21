import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRCIcaseComponent } from './create-rcicase.component';

describe('CreateRCIcaseComponent', () => {
  let component: CreateRCIcaseComponent;
  let fixture: ComponentFixture<CreateRCIcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRCIcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRCIcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
