import { SummaryPageModule } from './summary-page.module';

describe('SummaryPageModule', () => {
    let summaryPageModule: SummaryPageModule;

    beforeEach(() => {
        summaryPageModule = new SummaryPageModule();
    });

    it('should create an instance', () => {
        expect(summaryPageModule).toBeTruthy();
    });
});
