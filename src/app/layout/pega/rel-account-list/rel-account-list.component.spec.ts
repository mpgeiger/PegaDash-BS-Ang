import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelAccountListComponent } from './rel-account-list.component';

describe('RelAccountListComponent', () => {
  let component: RelAccountListComponent;
  let fixture: ComponentFixture<RelAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
