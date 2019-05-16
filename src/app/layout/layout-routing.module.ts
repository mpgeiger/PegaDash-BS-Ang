import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { OpenTaskPageComponent } from './opentask-page/opentask-page.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            // { path: 'homepage', loadChildren: './pega/home-page/home-page.module.#HomePageModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'summary-page', loadChildren: './summary-page/summary-page.module#SummaryPageModule' },
            { path: 'opentask-page', loadChildren: './opentask-page/opentask-page.module#OpenTaskPageModule' },
            // { path: 'opentask-page', component: OpenTaskPageComponent },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [
      // FormsModule,
      //  ReactiveFormsModule
    RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
