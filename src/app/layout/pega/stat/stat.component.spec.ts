import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PStatComponent } from './stat.component';

describe('StatComponent', () => {
    let component: PStatComponent;
    let fixture: ComponentFixture<PStatComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [PStatComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PStatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
