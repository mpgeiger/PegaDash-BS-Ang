import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PWorkItemComponent } from './pworkitem.component';

describe('PWorkItemComponent', () => {
    let component: PWorkItemComponent;
    let fixture: ComponentFixture<PWorkItemComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [PWorkItemComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PWorkItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
