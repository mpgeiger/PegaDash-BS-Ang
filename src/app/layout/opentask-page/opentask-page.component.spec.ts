import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTaskPageComponent } from './opentask-page.component';

describe('OpenTaskPageComponent', () => {
    let component: OpenTaskPageComponent;
    let fixture: ComponentFixture<OpenTaskPageComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [OpenTaskPageComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenTaskPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
