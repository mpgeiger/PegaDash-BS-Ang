import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenTaskPageComponent } from './opentask-page.component';

const routes: Routes = [
    {
        path: '',
        component: OpenTaskPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OpenTaskPageRoutingModule {}
