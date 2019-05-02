import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SummaryPageComponent } from './summary-page.component';

const routes: Routes = [
    {
        path: '',
        component: SummaryPageComponent
    }
];

@NgModule({
    imports: [

      RouterModule.forChild(routes)
  ],
    exports: [RouterModule]
})
export class SummaryPageRoutingModule {}
