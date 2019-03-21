import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListPanelSectionComponent } from './worklistpanelsection.component';

describe('WorkListPanelSectionComponent', () => {
  let component: WorkListPanelSectionComponent;
  let fixture: ComponentFixture<WorkListPanelSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkListPanelSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListPanelSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
