import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasedetailsComponent } from './casedetails.component';

const routes: Routes = [
    {
        path: '',
        component: CasedetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaseDetailsRoutingModule {}
