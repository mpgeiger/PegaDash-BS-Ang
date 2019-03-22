
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedtaskComponent } from './unifiedtask.component';

describe('UnifiedtaskComponent', () => {
  let component: UnifiedtaskComponent;
  let fixture: ComponentFixture<UnifiedtaskComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifiedtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
