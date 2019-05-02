import { CreateCustomRCIcaseModule } from './create-custom-rcicase.module';

describe('CreateCustomRCIcaseModule', () => {
    let createCustomRCIcaseModule: CreateCustomRCIcaseModule;

    beforeEach(() => {
      createCustomRCIcaseModule = new CreateCustomRCIcaseModule();
    });

    it('should create an instance', () => {
        expect(createCustomRCIcaseModule).toBeTruthy();
    });
});
