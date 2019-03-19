
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedtasklistComponent } from './unifiedtasklist.component';

describe('UnifiedtasklistComponent', () => {
  let component: UnifiedtasklistComponent;
  let fixture: ComponentFixture<UnifiedtasklistComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifiedtasklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedtasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
