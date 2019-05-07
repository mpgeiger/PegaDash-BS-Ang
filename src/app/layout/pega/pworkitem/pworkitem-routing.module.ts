import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PWorkItemComponent } from './pworkitem.component';

const routes: Routes = [
    {
        path: '',
        component: PWorkItemComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PWorkItemRoutingModule {}
