import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomRCIcaseComponent } from './create-custom-rcicase.component';

describe('CreateRCIcaseComponent', () => {
  let component: CreateCustomRCIcaseComponent;
  let fixture: ComponentFixture<CreateCustomRCIcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomRCIcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomRCIcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
