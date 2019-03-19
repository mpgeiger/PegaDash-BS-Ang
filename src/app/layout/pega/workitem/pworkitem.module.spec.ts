import { PWorkItemModule } from './pworkitem.module';

describe('PWorkItemModule', () => {
    let pworkItemModule: PWorkItemModule;

    beforeEach(() => {
        pworkItemModule = new PWorkItemModule();
    });

    it('should create an instance', () => {
        expect(pworkItemModule).toBeTruthy();
    });
});
