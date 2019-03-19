import { OpenTaskPageModule } from './opentask-page.module';

describe('OpenTaskPageModule', () => {
    let openTaskPageModule: OpenTaskPageModule;

    beforeEach(() => {
        openTaskPageModule = new OpenTaskPageModule();
    });

    it('should create an instance', () => {
        expect(openTaskPageModule).toBeTruthy();
    });
});
