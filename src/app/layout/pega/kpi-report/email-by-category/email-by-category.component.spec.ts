import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailByCategoryComponent } from './email-by-category.component';

describe('EmailByCategoryComponent', () => {
  let component: EmailByCategoryComponent;
  let fixture: ComponentFixture<EmailByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
